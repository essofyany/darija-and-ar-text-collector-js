import Morpho from "./Morpho";

class Normalizor extends Morpho {
  //==========================================
  // NORMALIZATION FUNCTIONS
  //==========================================

  /**
   * Normalization method for Arabic: it helps delete vocalization
   * <ul>
   * <li> voc: delete vocalization </li>
   * <li> alef: Replace all alef variants with the simple alef </li>
   * <li> ihamza: Replace all beginning hamza variants with the simple alef </li>
   * <li> yeh: Relace the alif maqsorah with yeh </li>
   * <li> teh: Replace teh marbuta with heh </li>
   * <li> _: Delete tatweel </li>
   * </ul>
   * @method norm_1
   * @method norm_2
   * @override
   * @memberof Normalizor
   * @param  {String} word the word to be normalized
   * @param  {String} opts some options (optional) where each language defines its own
   * normalization options
   * @return {String}      normalized word
   **/
  static norm(word, opts) {
    let norm = word.trim();

    //If no options are afforded, do all
    if (!opts || opts.length < 1) {
      opts = "voc,alef,yeh,teh,_,f";
    }

    //Delete vocals: fathah, kasrah, etc.
    if (opts.includes("voc")) {
      norm = norm.replace(/[َ ً ُ ٍ ْ ِ ٌ]/g, "");
    }

    //Replace all alef variants with the simple alef
    if (opts.includes("alef")) {
      norm = norm.replace(/[أإآ]/g, "ا");
    }

    //Replace initial hamza with alef
    if (opts.includes("ihamza")) {
      norm = norm.replace(/^[أإآ]/g, "ا");
    }

    //Relace the alif maqsorah with yeh
    if (opts.includes("yeh")) {
      norm = norm.replace(/[ى]/g, "ي");
    }

    //Replace teh marbuta with heh
    if (opts.includes("teh")) {
      norm = norm.replace(/[ة]/g, "ه");
    }

    //Delete tatweel
    if (opts.includes("_")) {
      norm = norm.replace(/[ـ]+/g, "");
    }

    return norm;
  }

  //    * @method norm_2
  //    * @override
  //    * @memberof Normalizor
  //    * @param  {String} word the word to be normalized
  //    * normalization options
  //    * @return {String}      normalized word

  static norm_2(word) {
    //Delete [ا] جدااااا => جدا
    let norm = word.trim();
    norm = norm.replace(/ا{2,}/gm, "ا");
    return norm;
  }
}

export default Normalizor;
