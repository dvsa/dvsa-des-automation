// List of known key values to unicode code points
// https://www.w3.org/TR/webdriver/#keyboard-actions
const keyUnicodeMap = {
  /* eslint-disable quote-props */
  'Unidentified': '\uE000',
  'Cancel': '\uE001',
  'Clear': '\uE005',
  'Help': '\uE002',
  'Pause': '\uE00B',
  'Backspace': '\uE003',
  'Return': '\uE006',
  'Enter': '\uE007',
  'Escape': '\uE00C',
  'Alt': '\uE00A',
  'AltLeft': '\uE00A',
  'AltRight': '\uE052',
  'Control': '\uE009',
  'ControlLeft': '\uE009',
  'ControlRight': '\uE051',
  'Meta': '\uE03D',
  'MetaLeft': '\uE03D',
  'MetaRight': '\uE053',
  'Shift': '\uE008',
  'ShiftLeft': '\uE008',
  'ShiftRight': '\uE050',
  'Space': '\uE00D',
  ' ': '\uE00D',
  'Tab': '\uE004',
  'Insert': '\uE016',
  'Delete': '\uE017',
  'End': '\uE010',
  'Home': '\uE011',
  'PageUp': '\uE00E',
  'PageDown': '\uE00F',
  'ArrowDown': '\uE015',
  'ArrowLeft': '\uE012',
  'ArrowRight': '\uE014',
  'ArrowUp': '\uE013',
  'F1': '\uE031',
  'F2': '\uE032',
  'F3': '\uE033',
  'F4': '\uE034',
  'F5': '\uE035',
  'F6': '\uE036',
  'F7': '\uE037',
  'F8': '\uE038',
  'F9': '\uE039',
  'F10': '\uE03A',
  'F11': '\uE03B',
  'F12': '\uE03C',
  'Numpad0': '\uE01A',
  'Numpad1': '\uE01B',
  'Numpad2': '\uE01C',
  'Numpad3': '\uE01D',
  'Numpad4': '\uE01E',
  'Numpad5': '\uE01F',
  'Numpad6': '\uE020',
  'Numpad7': '\uE021',
  'Numpad8': '\uE022',
  'Numpad9': '\uE023',
  'NumpadMultiply': '\uE024',
  'NumpadAdd': '\uE025',
  'NumpadSubtract': '\uE027',
  'NumpadDecimal': '\uE028',
  'NumpadDivide': '\uE029',
  'NumpadEnter': '\uE007',
  'NumpadInsert': '\uE05C', // 'Numpad0' alternate (when NumLock off)
  'NumpadDelete': '\uE05D', // 'NumpadDecimal' alternate (when NumLock off)
  'NumpadEnd': '\uE056', // 'Numpad1' alternate (when NumLock off)
  'NumpadHome': '\uE057', // 'Numpad7' alternate (when NumLock off)
  'NumpadPageDown': '\uE055', // 'Numpad3' alternate (when NumLock off)
  'NumpadPageUp': '\uE054', // 'Numpad9' alternate (when NumLock off)
  'NumpadArrowDown': '\uE05B', // 'Numpad2' alternate (when NumLock off)
  'NumpadArrowLeft': '\uE058', // 'Numpad4' alternate (when NumLock off)
  'NumpadArrowRight': '\uE05A', // 'Numpad6' alternate (when NumLock off)
  'NumpadArrowUp': '\uE059', // 'Numpad8' alternate (when NumLock off)
  'Comma': '\uE026', // ',' alias
  'Digit0': '0', // '0' alias
  'Digit1': '1', // '1' alias
  'Digit2': '2', // '2' alias
  'Digit3': '3', // '3' alias
  'Digit4': '4', // '4' alias
  'Digit5': '5', // '5' alias
  'Digit6': '6', // '6' alias
  'Digit7': '7', // '7' alias
  'Digit8': '8', // '8' alias
  'Digit9': '9', // '9' alias
  'Equal': '\uE019', // '=' alias
  'KeyA': 'a', // 'a' alias
  'KeyB': 'b', // 'b' alias
  'KeyC': 'c', // 'c' alias
  'KeyD': 'd', // 'd' alias
  'KeyE': 'e', // 'e' alias
  'KeyF': 'f', // 'f' alias
  'KeyG': 'g', // 'g' alias
  'KeyH': 'h', // 'h' alias
  'KeyI': 'i', // 'i' alias
  'KeyJ': 'j', // 'j' alias
  'KeyK': 'k', // 'k' alias
  'KeyL': 'l', // 'l' alias
  'KeyM': 'm', // 'm' alias
  'KeyN': 'n', // 'n' alias
  'KeyO': 'o', // 'o' alias
  'KeyP': 'p', // 'p' alias
  'KeyQ': 'q', // 'q' alias
  'KeyR': 'r', // 'r' alias
  'KeyS': 's', // 's' alias
  'KeyT': 't', // 't' alias
  'KeyU': 'u', // 'u' alias
  'KeyV': 'v', // 'v' alias
  'KeyW': 'w', // 'w' alias
  'KeyX': 'x', // 'x' alias
  'KeyY': 'y', // 'y' alias
  'KeyZ': 'z', // 'z' alias
  'Period': '.', // '.' alias
  'Semicolon': '\uE018', // ';' alias
  'Slash': '/', // '/' alias
  'ZenkakuHankaku': '\uE040',
  /* eslint-enable quote-props */
};
