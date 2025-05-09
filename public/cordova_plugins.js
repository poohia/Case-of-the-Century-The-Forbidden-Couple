cordova.define("cordova/plugin_list", function (require, exports, module) {
  module.exports = [
    {
      file: "plugins/cordova-plugin-file/www/DirectoryEntry.js",
      id: "cordova-plugin-file.DirectoryEntry",
      pluginId: "cordova-plugin-file",
      clobbers: ["window.DirectoryEntry"],
    },
    {
      file: "plugins/cordova-plugin-file/www/DirectoryReader.js",
      id: "cordova-plugin-file.DirectoryReader",
      pluginId: "cordova-plugin-file",
      clobbers: ["window.DirectoryReader"],
    },
    {
      file: "plugins/cordova-plugin-file/www/Entry.js",
      id: "cordova-plugin-file.Entry",
      pluginId: "cordova-plugin-file",
      clobbers: ["window.Entry"],
    },
    {
      file: "plugins/cordova-plugin-file/www/File.js",
      id: "cordova-plugin-file.File",
      pluginId: "cordova-plugin-file",
      clobbers: ["window.File"],
    },
    {
      file: "plugins/cordova-plugin-file/www/FileEntry.js",
      id: "cordova-plugin-file.FileEntry",
      pluginId: "cordova-plugin-file",
      clobbers: ["window.FileEntry"],
    },
    {
      file: "plugins/cordova-plugin-file/www/FileError.js",
      id: "cordova-plugin-file.FileError",
      pluginId: "cordova-plugin-file",
      clobbers: ["window.FileError"],
    },
    {
      file: "plugins/cordova-plugin-file/www/FileReader.js",
      id: "cordova-plugin-file.FileReader",
      pluginId: "cordova-plugin-file",
      clobbers: ["window.FileReader"],
    },
    {
      file: "plugins/cordova-plugin-file/www/FileSystem.js",
      id: "cordova-plugin-file.FileSystem",
      pluginId: "cordova-plugin-file",
      clobbers: ["window.FileSystem"],
    },
    {
      file: "plugins/cordova-plugin-file/www/FileUploadOptions.js",
      id: "cordova-plugin-file.FileUploadOptions",
      pluginId: "cordova-plugin-file",
      clobbers: ["window.FileUploadOptions"],
    },
    {
      file: "plugins/cordova-plugin-file/www/FileUploadResult.js",
      id: "cordova-plugin-file.FileUploadResult",
      pluginId: "cordova-plugin-file",
      clobbers: ["window.FileUploadResult"],
    },
    {
      file: "plugins/cordova-plugin-file/www/FileWriter.js",
      id: "cordova-plugin-file.FileWriter",
      pluginId: "cordova-plugin-file",
      clobbers: ["window.FileWriter"],
    },
    {
      file: "plugins/cordova-plugin-file/www/Flags.js",
      id: "cordova-plugin-file.Flags",
      pluginId: "cordova-plugin-file",
      clobbers: ["window.Flags"],
    },
    {
      file: "plugins/cordova-plugin-file/www/LocalFileSystem.js",
      id: "cordova-plugin-file.LocalFileSystem",
      pluginId: "cordova-plugin-file",
      clobbers: ["window.LocalFileSystem"],
      merges: ["window"],
    },
    {
      file: "plugins/cordova-plugin-file/www/Metadata.js",
      id: "cordova-plugin-file.Metadata",
      pluginId: "cordova-plugin-file",
      clobbers: ["window.Metadata"],
    },
    {
      file: "plugins/cordova-plugin-file/www/ProgressEvent.js",
      id: "cordova-plugin-file.ProgressEvent",
      pluginId: "cordova-plugin-file",
      clobbers: ["window.ProgressEvent"],
    },
    {
      file: "plugins/cordova-plugin-file/www/fileSystems.js",
      id: "cordova-plugin-file.fileSystems",
      pluginId: "cordova-plugin-file",
    },
    {
      file: "plugins/cordova-plugin-file/www/requestFileSystem.js",
      id: "cordova-plugin-file.requestFileSystem",
      pluginId: "cordova-plugin-file",
      clobbers: ["window.requestFileSystem"],
    },
    {
      file: "plugins/cordova-plugin-file/www/resolveLocalFileSystemURI.js",
      id: "cordova-plugin-file.resolveLocalFileSystemURI",
      pluginId: "cordova-plugin-file",
      merges: ["window"],
    },
    {
      file: "plugins/cordova-plugin-file/www/browser/isChrome.js",
      id: "cordova-plugin-file.isChrome",
      pluginId: "cordova-plugin-file",
      runs: true,
    },
    {
      file: "plugins/cordova-plugin-file/www/browser/Preparing.js",
      id: "cordova-plugin-file.Preparing",
      pluginId: "cordova-plugin-file",
      runs: true,
    },
    {
      file: "plugins/cordova-plugin-file/src/browser/FileProxy.js",
      id: "cordova-plugin-file.browserFileProxy",
      pluginId: "cordova-plugin-file",
      runs: true,
    },
    {
      file: "plugins/cordova-plugin-file/www/fileSystemPaths.js",
      id: "cordova-plugin-file.fileSystemPaths",
      pluginId: "cordova-plugin-file",
      merges: ["cordova"],
      runs: true,
    },
    {
      file: "plugins/cordova-plugin-file/www/browser/FileSystem.js",
      id: "cordova-plugin-file.firefoxFileSystem",
      pluginId: "cordova-plugin-file",
      merges: ["window.FileSystem"],
    },
    {
      file: "plugins/cordova-plugin-media/www/MediaError.js",
      id: "cordova-plugin-media.MediaError",
      pluginId: "cordova-plugin-media",
      clobbers: ["window.MediaError"],
    },
    {
      file: "plugins/cordova-plugin-media/www/Media.js",
      id: "cordova-plugin-media.Media",
      pluginId: "cordova-plugin-media",
      clobbers: ["window.Media"],
    },
    {
      file: "plugins/cordova-plugin-media/www/browser/Media.js",
      id: "cordova-plugin-media.BrowserMedia",
      pluginId: "cordova-plugin-media",
      clobbers: ["window.Media"],
    },
  ];
  module.exports.metadata =
    // TOP OF METADATA
    {
      "cordova-plugin-file": "7.0.0",
      "cordova-plugin-media": "6.1.0",
    };
  // BOTTOM OF METADATA
});
