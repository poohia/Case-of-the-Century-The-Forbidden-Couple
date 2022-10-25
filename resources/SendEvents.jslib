mergeInto(LibraryManager.library, {
  sendDocumentEventWithData: function (eventName, data = null) {
    const eventStr = UTF8ToString(eventName);
    const dataStr = UTF8ToString(data);
    let documentEvent = new CustomEvent(eventStr, { detail: dataStr });

    console.log("send event " + eventStr + " with data " + dataStr);
    document.dispatchEvent(documentEvent);
  },
  sendDocumentEvent: function (eventName) {
    const eventStr = UTF8ToString(eventName);
    let documentEvent = new CustomEvent(eventStr);
    console.log("send event " + eventStr + " without data");
    document.dispatchEvent(documentEvent);
  },
});
