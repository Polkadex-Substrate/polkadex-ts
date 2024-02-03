import {
  MagnifyingGlassIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import {
  ChangeEvent,
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  FocusEvent,
  KeyboardEvent,
  PropsWithChildren,
  PropsWithoutRef,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { isValidComponent } from "../helpers";

import { Button as PolkadexButton } from "./button";
import type { ButtonProps as PolkadexButtonProps } from "./button";
import { TextProps, Typography } from "./typography";
import { LabelProps, Label as LabelPolkadex } from "./label";

const Action = forwardRef<
  HTMLButtonElement,
  PropsWithoutRef<PolkadexButtonProps>
>(({ size = "xs", appearance = "secondary", children, ...props }, ref) => (
  <PolkadexButton.Solid
    ref={ref}
    size={size}
    appearance={appearance}
    {...props}
  >
    {children}
  </PolkadexButton.Solid>
));

Action.displayName = "Action";

const Base = forwardRef<ElementRef<"input">, ComponentPropsWithoutRef<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        size={props.placeholder?.length}
        type="text"
        className={twMerge(
          classNames(
            "flex-1 bg-transparent text-current placeholder:text-primary outline-none"
          ),
          className
        )}
        {...props}
      />
    );
  }
);

Base.displayName = "Base";

const Primary = forwardRef<
  ElementRef<"input">,
  PropsWithChildren<ComponentPropsWithoutRef<"input">>
>(({ children, ...props }) => {
  const ref = useRef<HTMLInputElement>(null);
  const ButtonComponents = isValidComponent(children, Button);
  const [LabelComponent] = isValidComponent(children, Label);
  const [TickerComponent] = isValidComponent(children, Ticker);

  return (
    <div
      className="flex justify-between items-center gap-2 bg-level-3 h-[45px] rounded"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        ref?.current?.focus();
      }}
    >
      <div className="flex flex-1 items-center justify-between gap-2 pl-3 pr-2">
        <div className="flex items-center gap-2">
          {LabelComponent}
          <Base ref={ref} className="text-sm" {...props} />
        </div>
        {TickerComponent}
      </div>
      {!!ButtonComponents?.length && (
        <div className="flex h-full flex-col gap-0.5">{ButtonComponents}</div>
      )}
    </div>
  );
});

Primary.displayName = "Primary";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "increase" | "decrease";
}

const Button = ({
  variant,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    children ?? (
      <button
        className="rounded-tr flex-auto px-3 bg-level-4 hover:bg-level-2 duration-300 transition-colors ease-out"
        {...props}
      >
        {variant === "increase" ? (
          <PlusIcon className="w-3 h-3" />
        ) : (
          <MinusIcon className="w-3 h-3" />
        )}
      </button>
    )
  );
};

const Ticker = ({
  children,
  size = "sm",
  ...props
}: PropsWithChildren<TextProps>) => (
  <Typography.Text size={size} {...props}>
    {children}
  </Typography.Text>
);

const Label = ({
  appearance = "primary",
  size = "sm",
  ...props
}: PropsWithChildren<LabelProps>) => (
  <LabelPolkadex appearance={appearance} size={size} {...props} />
);

const Search = forwardRef<
  ElementRef<"input">,
  ComponentPropsWithoutRef<"input">
>((props, ref) => {
  return (
    <div className="flex flex-1 items-center gap-2">
      <MagnifyingGlassIcon className="w-4 h-4 text-primary" />
      <Base ref={ref} className="text-sm" {...props} />
    </div>
  );
});
Search.displayName = "Search";

const Vertical = ({
  id,
  children,
  ...props
}: PropsWithChildren<ComponentPropsWithoutRef<"input">>) => {
  const LabelComponent = isValidComponent(children, Label);
  const ButtonComponent = isValidComponent(children, Action);

  return (
    <div className="flex flex-col gap-2 w-full">
      {LabelComponent}
      <div className="flex items-center justify-between gap-2 flex-1">
        <Base id={id} className="text-lg font-medium" {...props} />
        {ButtonComponent}
      </div>
    </div>
  );
};

interface PasscodeProps
  extends Omit<ComponentProps<"input">, "value" | "onChange"> {
  focusOnInit?: boolean;
  onValuesChange: (value: string) => void;
  value: string;
  inputNumb?: number;
  error?: boolean;
}

const Passcode = ({
  type,
  focusOnInit,
  className,
  value,
  onValuesChange,
  inputNumb = 5,
  error,
  ...props
}: PasscodeProps) => {
  const inputsRef = useRef<Array<HTMLInputElement> | []>([]);

  const [currentValue, setCurrentValue] = useState(0);

  const values: (string | number)[] = useMemo(() => {
    const splitValues = [...value.split("").map(String)];
    return [...splitValues, ...Array(inputNumb - splitValues.length).fill("")];
  }, [value, inputNumb]);

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    const isBackspacePressed = e.key === "Backspace";
    const hasRef = inputsRef && inputsRef?.current && index === currentValue;
    const isValidNumber = !isNaN(parseInt(e.key)) && index <= inputNumb;

    const updateCurrentValue = (newIndex: number) => {
      setCurrentValue(newIndex);
      if (hasRef) inputsRef.current[newIndex]?.focus();
    };

    const newArray = [...values];

    if (isBackspacePressed) {
      if (index > 0 && newArray[index] !== undefined)
        updateCurrentValue(index - 1);
    } else if (isValidNumber) {
      newArray[index] = parseInt(e.key) || e.key;
      if (index < inputNumb - 1) {
        updateCurrentValue(index + 1);
      }
    }

    // console.log("index", index, newArray);
    // onValuesChange(newArray.join(""));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    const keyCode = Number(e.key);
    const isNotBackspacePressed = e.key !== "Backspace";
    const isRightArrowPressed = e.key === "ArrowRight";
    const isLeftArrowPressed = e.key === "ArrowLeft";
    const isTabPressed = e.key === "Tab";

    const validNumber = !(keyCode >= 0 && keyCode <= 9);
    const isPastePressed = !(e.metaKey && e.key === "v");

    if (validNumber && isNotBackspacePressed && isPastePressed) {
      e.preventDefault();
    }
    if ((isRightArrowPressed || isTabPressed) && index < inputNumb - 1) {
      setCurrentValue(index + 1);
      inputsRef.current[index + 1].focus();
    }
    if (isLeftArrowPressed && index > 0) {
      setCurrentValue(index - 1);
      inputsRef.current[index - 1].focus();
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newArray: (string | number)[] = [...values];
    const inputValue = e.target.value;
    newArray[index] = parseInt(inputValue) || inputValue;

    console.log("Aqui...");
    onValuesChange(newArray.join(""));
  };

  const onFocus = (e: FocusEvent<HTMLInputElement>, index: number) => {
    setCurrentValue(index);
    e.target.focus();
  };

  useEffect(() => {
    if (focusOnInit && inputsRef && inputsRef.current)
      inputsRef.current[0].focus();
  }, [focusOnInit]);

  return (
    <div className="flex items-center gap-2">
      {new Array(inputNumb).fill("").map((_, i) => {
        const v = values[i];
        return (
          <input
            key={i}
            ref={(element) => element && (inputsRef.current[i] = element)}
            type={type}
            maxLength={1}
            inputMode="numeric"
            pattern="\d{1}"
            className={twMerge(
              classNames(
                "h-8 w-7 bg-level-3 text-center rounded-md transition-colors duration-300",
                "focus:ring-0 focus:ring-offset-0 focus:outline focus:outline-offset-1 focus:focus:outline-primary-base",
                values[i] && "bg-level-1",
                error && "bg-danger-base"
              ),
              className
            )}
            value={v ?? ""}
            onChange={(e) => onChange(e, i)}
            onKeyUp={(e) => onKeyUp(e, i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            onFocus={(e) => onFocus(e, i)}
            {...props}
          />
        );
      })}
    </div>
  );
};

export const Input = {
  Primary,
  Search,
  Vertical,
  Passcode,
  Button,
  Label,
  Ticker,
  Action,
};
