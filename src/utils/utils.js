import { path } from "ramda";

export function getFromTheme(themePath = "") {
  return function getFromThemeProps(props = {}) {
    return path(themePath.split("."), props.theme);
  };
}

export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function timeConverter(UNIX_timestamp){
  const a = new Date(UNIX_timestamp);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

export function timeConverterForInput(UNIX_timestamp){
  const a = new Date(UNIX_timestamp);
  const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const time = year + '-' + month + '-' + date ;
  return time;
}
