const target = new EventTarget();

export const OC_UNAUTHORIZED_EVENT = "oc:unauthorized";

export function emitUnauthorized() {
  target.dispatchEvent(new Event(OC_UNAUTHORIZED_EVENT));
}

export function onUnauthorized(handler: () => void) {
  target.addEventListener(OC_UNAUTHORIZED_EVENT, handler);
  return () => target.removeEventListener(OC_UNAUTHORIZED_EVENT, handler);
}
