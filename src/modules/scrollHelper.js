export default function scrollHelper(event) {
  const { target } = event;
  const listHeight = target.getBoundingClientRect().top;
  const elements = target.children;
  let offsets = [];
  for (let element of elements) {
    const elTop = element.getBoundingClientRect().top;
    const elBottom = element.getBoundingClientRect().bottom;
    const offset = Math.floor(elTop - (listHeight - 8));
    offsets.push({ offset, elTop, elBottom });
    const elDegrees = Math.floor(offset * -3);
    if (offset <= 0 && offset >= -45 && elDegrees < 90) {
      element.style.transform = `rotateX(${elDegrees}deg)`;
    } else if (offset < -36 && elDegrees >= 90) {
      element.style.transform = "rotateX(90deg)";
    } else {
      element.style.transform = "rotateX(0deg)";
    }
  }
  // console.log(offsets);
}
