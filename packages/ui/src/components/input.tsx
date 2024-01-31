import {
  MagnifyingGlassIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import {
  ChangeEvent,
  ComponentProps,
  ComponentPropsWithoutRef,
  Dispatch,
  ElementRef,
  FocusEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  PropsWithChildren,
  SetStateAction,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { isValidComponent } from "../helpers";

import { Button as PolkadexButton } from "./button";
import { TextProps, Typography } from "./typography";
import { LabelProps, Label as LabelPolkadex } from "./label";

const Base = forwardRef<ElementRef<"input">, ComponentPropsWithoutRef<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        size={props.placeholder?.length}
        type="text"
        className={twMerge(
          classNames(
            "flex-1 bg-transparent text-current placeholder:text-primary text-sm outline-none",
            className
          )
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ children, ...props }, _) => {
  const ref = useRef<HTMLInputElement>(null);
  const ButtonComponents = isValidComponent(children, Button);
  const LabelComponent = isValidComponent(children, Label);
  const TickerComponent = isValidComponent(children, Ticker);

  return (
    <div
      className="flex justify-between items-center gap-2 bg-level-3 h-[45px] rounded"
      onClick={() => ref?.current?.focus()}
    >
      <div className="flex flex-1 items-center justify-between gap-2 pl-3 pr-2">
        <div className="flex items-center gap-2">
          {LabelComponent}
          <Base ref={ref} {...props} />
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
  variant: "increase" | "decrease";
}

const Button = ({ variant, ...props }: ButtonProps) => {
  return (
    <button
      className="rounded-tr  flex-auto px-3 bg-level-4 hover:bg-level-2 duration-300 transition-colors ease-out"
      {...props}
    >
      {variant === "increase" ? (
        <PlusIcon className="w-3 h-3" />
      ) : (
        <MinusIcon className="w-3 h-3" />
      )}
    </button>
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
      <Base ref={ref} {...props} />
    </div>
  );
});
Search.displayName = "Search";

interface VerticalProps extends ComponentProps<"input"> {
  action?: (e: MouseEvent<HTMLButtonElement>) => void;
  actionTitle?: string;
}

const Vertical = ({
  action,
  actionTitle,
  id,
  children,
  ...props
}: PropsWithChildren<VerticalProps>) => {
  const LabelComponent = isValidComponent(children, Label);

  return (
    <div className="flex flex-col gap-2 flex-1">
      {LabelComponent}
      <div className="flex items-center justify-between gap-2 flex-1">
        <input
          id={id}
          type="text"
          className="flex-1 bg-transparent text-lg outline-none font-medium"
          {...props}
        />
        {action && (
          <PolkadexButton.Solid
            appearance="secondary"
            size="xs"
            onClick={action}
          >
            {actionTitle}
          </PolkadexButton.Solid>
        )}
      </div>
    </div>
  );
};

interface PasscodeProps
  extends Pick<InputHTMLAttributes<HTMLInputElement>, "className" | "type"> {
  focusOnInit?: boolean;
  onValuesChange: Dispatch<SetStateAction<(string | number)[]>>;
  values: (string | number)[];
}

const Passcode = ({
  type,
  focusOnInit,
  className,
  values,
  onValuesChange,
}: PasscodeProps) => {
  const inputsRef = useRef<Array<HTMLInputElement> | []>([]);

  const [currentValue, setCurrentValue] = useState(0);

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    const isBackspacePressed = e.key === "Backspace";
    const hasRef = inputsRef && inputsRef?.current && index === currentValue;
    const isValidNumber = !isNaN(parseInt(e.key)) && index <= values.length;

    const updateCurrentValue = (newIndex: number) => {
      setCurrentValue(newIndex);
      if (hasRef) inputsRef.current[newIndex].focus();
    };

    onValuesChange((prev) => {
      const newArray = [...prev];

      if (isBackspacePressed) {
        if (index > 0 && newArray[index] !== undefined)
          updateCurrentValue(index - 1);
      } else if (isValidNumber) {
        newArray[index] = parseInt(e.key) || e.key;
        if (index < values.length - 1) {
          updateCurrentValue(index + 1);
        }
      }

      return newArray;
    });
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
    if ((isRightArrowPressed || isTabPressed) && index < values.length - 1) {
      setCurrentValue(index + 1);
      inputsRef.current[index + 1].focus();
    }
    if (isLeftArrowPressed && index > 0) {
      setCurrentValue(index - 1);
      inputsRef.current[index - 1].focus();
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>, index: number) =>
    onValuesChange((prev) => {
      const newArray = [...prev];
      const inputValue = e.target.value;
      newArray[index] = parseInt(inputValue) || inputValue;
      return newArray;
    });

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
      {values.map((v, i) => (
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
              values[i] && "bg-level-1"
            ),
            className
          )}
          value={String(v)}
          onChange={(e) => onChange(e, i)}
          onKeyUp={(e) => onKeyUp(e, i)}
          onKeyDown={(e) => onKeyDown(e, i)}
          onFocus={(e) => onFocus(e, i)}
        />
      ))}
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
};
