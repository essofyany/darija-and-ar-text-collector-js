class DeleteRedundancy {
  constructor(word) {}

  normalize(word) {
    //Delete [ا] جدااااا => جدا
    let norm = word.trim();
    norm = norm.replace(/ا{2,}/gm, "ا");
    norm = norm.replace(/ه{2,}/gm, "ه");
    norm = norm.replace(/ي{2,}/gm, "ي");
    norm = norm.replace(/ب{2,}/gm, "ب");
    norm = norm.replace(/ل{2,}/gm, "ل");
    norm = norm.replace(/ن{2,}/gm, "ن");
    norm = norm.replace(/ت{2,}/gm, "ت");
    norm = norm.replace(/م{2,}/gm, "م");
    norm = norm.replace(/ك{2,}/gm, "ك");
    norm = norm.replace(/ط{2,}/gm, "ط");
    norm = norm.replace(/د{2,}/gm, "د");
    norm = norm.replace(/ج{2,}/gm, "ج");
    norm = norm.replace(/ح{2,}/gm, "ح");
    norm = norm.replace(/خ{2,}/gm, "خ");
    norm = norm.replace(/غ{2,}/gm, "غ");
    norm = norm.replace(/ف{2,}/gm, "ف");
    norm = norm.replace(/ق{2,}/gm, "ق");
    norm = norm.replace(/ث{2,}/gm, "ث");
    norm = norm.replace(/ص{2,}/gm, "ص");
    norm = norm.replace(/ش{2,}/gm, "ش");
    norm = norm.replace(/س{2,}/gm, "س");
    norm = norm.replace(/ر{2,}/gm, "ر");
    norm = norm.replace(/لا{2,}/gm, "لا");
    norm = norm.replace(/ى{2,}/gm, "ى");
    norm = norm.replace(/ة{2,}/gm, "ة");
    norm = norm.replace(/و{2,}/gm, "و");
    norm = norm.replace(/ز{2,}/gm, "ز");
    norm = norm.replace(/ظ{2,}/gm, "ظ");

    return norm;
  }
}

export default DeleteRedundancy;
