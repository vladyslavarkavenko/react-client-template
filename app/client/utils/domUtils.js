export function scrollToElement(elem, offset = 0) {
  const rect = elem.getBoundingClientRect();
  const position = window.scrollY + rect.top - offset;

  window.scrollTo({ top: position, behavior: 'smooth' });
}
