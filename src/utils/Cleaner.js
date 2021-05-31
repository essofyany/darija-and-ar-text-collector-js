export class Cleaner {
  constructor(str) {
    this.str = str;
    // /\w+/g :Matches any letter, digit or underscore. Equivalent to [a-zA-Z0-9_].
    this.regex_chars = /\w+/g;

    // regular expression for removing emojis
    this.regex_emojis =
      /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

    //  regular expression for removing symbols
    this.regex_0 = /\@{1,}/gm;
    this.regex_1 = /\/{1,}/gm;
    this.regex_2 = /\.{1,}/gm;
    this.regex_3 = /\#{1,}/gm;
    this.regex_4 = /\:{1,}/gm;
    this.regex_5 = /\?{1,}/gm;
    this.regex_6 = /\'{1,}/gm;
    this.regex_7 = /\"{1,}/gm;
    this.regex_8 = /\`{1,}/gm;
    this.regex_9 = /\*{1,}/gm;
    this.regex_11 = /\${1,}/gm;
    this.regex_12 = /\&{1,}/gm;
    this.regex_13 = /\%{1,}/gm;
    this.regex_14 = /\({1,}/gm;
    this.regex_15 = /\){1,}/gm;
    this.regex_16 = /\={1,}/gm;
    this.regex_17 = /\[{1,}/gm;
    this.regex_18 = /\]{1,}/gm;
    this.regex_19 = /\+{1,}/gm;
    this.regex_10 = /\-{1,}/gm;
    this.regex_20 = /\<{1,}/gm;
    this.regex_21 = /\>{1,}/gm;
    this.regex_22 = /\!{1,}/gm;
    this.regex_23 = /\؟{1,}/gm;
    this.regex_24 = /\…{1,}/gm;
    this.regex_25 = /\،{1,}/gm;
    this.regex_26 = /\\{1,}/gm;
    this.regex_27 = /\é{1,}/gm;
    this.regex_28 = /\à{1,}/gm;
    this.regex_29 = /\—{1,}/gm;
    this.regex_30 = /\,{1,}/gm;
    this.regex_31 = /\;{1,}/gm;
  }

  removeEmojis() {
    return this.str.replace(this.regex_emojis, "");
  }

  removeChars() {
    let xt = this.str.replace(this.regex_chars, "");
    return console.log(xt);
  }
  // full text clean up
  cleanOrder_1() {
    return this.str
      .replace(this.regex_chars, "")
      .replace(this.regex_emojis, "")
      .replace(this.regex_0, "")
      .replace(this.regex_1, "")
      .replace(this.regex_2, "")
      .replace(this.regex_3, "")
      .replace(this.regex_4, "")
      .replace(this.regex_5, "")
      .replace(this.regex_6, "")
      .replace(this.regex_7, "")
      .replace(this.regex_8, "")
      .replace(this.regex_9, "")
      .replace(this.regex_10, "")
      .replace(this.regex_11, "")
      .replace(this.regex_12, "")
      .replace(this.regex_13, "")
      .replace(this.regex_14, "")
      .replace(this.regex_15, "")
      .replace(this.regex_16, "")
      .replace(this.regex_17, "")
      .replace(this.regex_18, "")
      .replace(this.regex_19, "")
      .replace(this.regex_20, "")
      .replace(this.regex_21, "")
      .replace(this.regex_22, "")
      .replace(this.regex_23, "")
      .replace(this.regex_24, "")
      .replace(this.regex_25, "")
      .replace(this.regex_26, "")
      .replace(this.regex_27, "")
      .replace(this.regex_28, "")
      .replace(this.regex_29, "")
      .replace(this.regex_30, "")
      .replace(this.regex_31, "");
  }

  checkSimilarity() {}

  deleteDups(arr) {
      
  }
}
