"use client";

import {
  ChangeEvent,
  ComponentProps,
  KeyboardEvent,
  MutableRefObject,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

interface PasscodeProps
  extends Omit<ComponentProps<"input">, "value" | "onChange"> {
  focusOnInit?: boolean;
  onValuesChange: (value: string) => void;
  value: string;
  inputNumb?: number;
  error?: boolean;
  containerProps?: ComponentProps<"div">;
  preventScroll?: boolean;
}

const Outline = forwardRef<HTMLInputElement, PasscodeProps>(
  (
    {
      type,
      focusOnInit,
      value,
      onValuesChange,
      inputNumb = 5,
      error,
      preventScroll = true,
      containerProps,
      ...props
    },
    ref
  ) => {
    const inputsRef = useRef<Array<HTMLInputElement> | []>([]);

    const { className: containerClassName, ...remainingProps } =
      containerProps ?? {};
    const [currentValue, setCurrentValue] = useState(0);

    const values: (string | number)[] = useMemo(() => {
      const splitValues = [...value.split(" ").map(String)];
      return [
        ...splitValues,
        ...Array(inputNumb - splitValues.length).fill(""),
      ];
    }, [value, inputNumb]);

    const onKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        const isBackspacePressed = e.key === "Backspace";
        const isRightArrowPressed = e.key === "ArrowRight" || e.key === "Tab";
        const isLeftArrowPressed = e.key === "ArrowLeft";
        const isValidNumber = !isNaN(parseInt(e.key)) && index <= inputNumb;
        const inputLength = inputNumb - 1;

        if (isBackspacePressed) {
          if (index > 0) {
            setCurrentValue(index - 1);
            inputsRef.current[index - 1]?.focus({ preventScroll });
          }
        } else if (isRightArrowPressed && index < inputNumb - 1) {
          setCurrentValue(index + 1);
          inputsRef.current[index + 1]?.focus({ preventScroll });
        } else if (isLeftArrowPressed && index > 0) {
          setCurrentValue(index - 1);
          inputsRef.current[index - 1]?.focus({ preventScroll });
        } else if (isValidNumber && index < inputLength) {
          setCurrentValue(index + 1);
          inputsRef.current[index + 1]?.focus({ preventScroll });
        }
      },
      [inputNumb, preventScroll]
    );

    const onChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>, index: number) => {
        e.preventDefault();
        e.stopPropagation();
        const newArray = [...value.split(" ").map(String)];
        newArray[index] = e.target.value;
        onValuesChange(newArray.join(" "));
      },
      [value, onValuesChange]
    );

    useEffect(() => {
      if (focusOnInit && !!inputsRef && !value.length) {
        inputsRef.current[0].focus({ preventScroll });
        setCurrentValue(0);
      }
    }, [focusOnInit, value, preventScroll]);

    return (
      <Context.Provider
        value={{
          inputsRef,
          inputNumb,
          values,
          currentValue,
        }}
      >
        <div
          className={twMerge(
            classNames("flex items-center gap-2"),
            containerClassName
          )}
          {...remainingProps}
        >
          {new Array(inputNumb).fill(null).map((_, i) => {
            const v = values[i];
            return (
              <Input
                ref={ref}
                key={i}
                position={i}
                type={type}
                value={v ?? ""}
                onChange={(e) => onChange(e, i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                error={error}
                {...props}
              />
            );
          })}
        </div>
      </Context.Provider>
    );
  }
);
Outline.displayName = "Outline";
interface InputProps extends ComponentProps<"input"> {
  error?: boolean;
  position: number;
}

const Input = ({ className, position, error, value, ...props }: InputProps) => {
  const { inputsRef, values } = usePasscodeProvider();
  const hasData = useMemo(() => values[position], [position, values]);

  return (
    <input
      ref={(element) => {
        if (element && inputsRef.current) inputsRef.current[position] = element;
      }}
      maxLength={1}
      autoComplete="off"
      inputMode="numeric"
      pattern="\d{1}"
      className={twMerge(
        classNames(
          "flex-1 py-5 h-8 w-6 border text-center rounded-sm transition-colors duration-300 text-sm",
          "focus:ring-0 focus:outline-none",
          hasData ? "bg-level-1" : "bg-transparent",
          error
            ? "bg-danger-base/50 border-danger-base"
            : "focus:bg-level-1 border-primary"
        ),
        className
      )}
      value={value}
      {...props}
    />
  );
};

type State = {
  inputsRef: MutableRefObject<Array<HTMLInputElement> | []>;
  inputNumb: number;
  values: (string | number)[];
  currentValue: number;
};

const Context = createContext<State>({
  inputsRef: { current: [] },
  inputNumb: 0,
  values: [],
  currentValue: 0,
});

export const usePasscodeProvider = () => {
  const state = useContext(Context);
  if (!Context)
    throw new Error(
      "usePasscodeProvider must be used within an Passcode component"
    );
  return { ...state };
};

export const Passcode = {
  Outline,
};
