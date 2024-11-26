export async function loadGoogleMapsScript(apiKey: string) {
  if (document.querySelector(`script[src*="${apiKey}"]`)) {
    return; // 이미 로드된 스크립트 방지
  }
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&libraries=places&callback=initMap`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((res) => setTimeout(res, 100));
}
