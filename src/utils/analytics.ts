export function trackEvent(eventName: string, properties?: Record<string, any>) {
  // In a real production environment, this function would map to your analytics provider:
  // e.g., window.gtag('event', eventName, properties);
  // e.g., mixpanel.track(eventName, properties);
  // e.g., plausible(eventName, { props: properties });

  if (import.meta.env.MODE === 'development') {
    console.groupCollapsed(`📊 Analytics Event: ${eventName}`);
    if (properties) {
      console.table(properties);
    }
    console.groupEnd();
  }
}
