import {
  Children,
  Context,
  createContext,
  createElement,
  isValidElement,
  ReactNode,
  startTransition,
  useActionState as useActionStateReact,
  useContext,
  useEffect,
  useState
} from 'react';

export function useStrictContext<T>(context: Context<T | null>) {
  const value = useContext(context);
  if (value === null) throw new Error('Strict context not passed');
  return value as T;
}

export function createStrictContext<T>() {
  return createContext<T | null>(null);
}

export function useAppearanceDelay(
  show?: boolean,
  options = {} as {
    defaultValue?: boolean;
    appearenceDelay?: number;
    minDisplay?: number;
  }
) {
  const {
    minDisplay = 500,
    defaultValue = false,
    appearenceDelay = 500
  } = options;

  const [delayedShow, setDelayedShow] = useState(defaultValue);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        startTransition(() => setDelayedShow(true));
      }, appearenceDelay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        startTransition(() => setDelayedShow(false));
      }, minDisplay);
      return () => clearTimeout(timer);
    }
  }, [appearenceDelay, show, minDisplay]);

  return delayedShow;
}

export function ComposeChildren({ children }: { children: ReactNode }) {
  const array = Children.toArray(children);
  const last = array.pop();
  return (
    <>
      {array.reduceRight(
        (child, element) =>
          isValidElement(element)
            ? createElement(element.type, element.props, child)
            : child,
        last
      )}
    </>
  );
}

export function useActionState<State, InitialState>(
  action: (state: Awaited<State>) => State | Promise<State>,
  initialState: InitialState,
  permalink?: string
): [
  state: Awaited<State> | InitialState,
  dispatch: () => void,
  isPending: boolean
];
export function useActionState<State, InitialState, Payload>(
  action: (state: Awaited<State>, payload: Payload) => State | Promise<State>,
  initialState: InitialState,
  permalink?: string
): [
  state: Awaited<State> | InitialState,
  dispatch: (payload: Payload) => void,
  isPending: boolean
];

export function useActionState(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: any,
  premalink?: string
) {
  return useActionStateReact(action, initialState, premalink);
}
