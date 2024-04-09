export const compareData = (podium, oldData) => {
  return podium.map((el, idx) => {
    if (!oldData && oldData === []) return el;
    const oldIndex = oldData.findIndex((element) => element.email === el.email);
    if (oldIndex !== -1) el.compare = oldIndex - idx;
    else el.compare = 0;
    return el;
  })
}
