// Unity WebGL Loader Script
// 将内联脚本移到这里以避免CSP限制

var unityInstance = null;

function initializeUnity() {
  const container = document.querySelector("#unity-container");
  const canvas = document.querySelector("#unity-canvas");
  const loadingCover = document.querySelector("#loading-cover");
  const progressBarEmpty = document.querySelector("#unity-progress-bar-empty");
  const progressBarFull = document.querySelector("#unity-progress-bar-full");
  const fullscreenButton = document.querySelector("#unity-fullscreen-button");
  const spinner = document.querySelector('.spinner');

  // 从HTML中获取配置信息
  const hideFullScreenButton = document.querySelector('meta[name="hide-fullscreen"]')?.content || "false";
  const buildUrl = "Build";
  const loaderUrl = buildUrl + "/" + (document.querySelector('meta[name="loader-filename"]')?.content || "ef248b911a736218eaa7fcf2aa24448d.loader.js");
  
  const config = {
    dataUrl: buildUrl + "/" + (document.querySelector('meta[name="data-filename"]')?.content || "82253159621bd7c002137f80b78c51e5.data"),
    frameworkUrl: buildUrl + "/" + (document.querySelector('meta[name="framework-filename"]')?.content || "0dc66df7cb7672705a95a07b5b5abff8.framework.js"),
    codeUrl: buildUrl + "/" + (document.querySelector('meta[name="code-filename"]')?.content || "dba5457bdbbb26f4e7ce5acde7f44eeb.wasm"),
    streamingAssetsUrl: "StreamingAssets",
    companyName: document.querySelector('meta[name="company-name"]')?.content || "DefaultCompany",
    productName: document.querySelector('meta[name="product-name"]')?.content || "Qidian",
    productVersion: document.querySelector('meta[name="product-version"]')?.content || "1.0",
  };

  // 检查是否有内存文件
  const memoryFilename = document.querySelector('meta[name="memory-filename"]')?.content;
  if (memoryFilename) {
    config.memoryUrl = buildUrl + "/" + memoryFilename;
  }

  // 检查是否有符号文件
  const symbolsFilename = document.querySelector('meta[name="symbols-filename"]')?.content;
  if (symbolsFilename) {
    config.symbolsUrl = buildUrl + "/" + symbolsFilename;
  }

  const canFullscreen = (function() {
    for (const key of [
        'exitFullscreen',
        'webkitExitFullscreen',
        'webkitCancelFullScreen',
        'mozCancelFullScreen',
        'msExitFullscreen',
      ]) {
      if (key in document) {
        return true;
      }
    }
    return false;
  }());

  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    container.className = "unity-mobile";
    config.devicePixelRatio = 1;
  }

  // 检查是否有背景文件
  const backgroundFilename = document.querySelector('meta[name="background-filename"]')?.content;
  if (backgroundFilename) {
    canvas.style.background = "url('" + buildUrl + "/" + backgroundFilename.replace(/'/g, '%27') + "') center / cover";
  }

  loadingCover.style.display = "";

  const script = document.createElement("script");
  script.src = loaderUrl;
  script.onload = () => {
    unityInstance = createUnityInstance(canvas, config, (progress) => {
      spinner.style.display = "none";
      progressBarEmpty.style.display = "";
      progressBarFull.style.width = `${100 * progress}%`;
    }).then((unityInstance) => {
      loadingCover.style.display = "none";
      if (canFullscreen) {
        if (hideFullScreenButton !== "true") {
          fullscreenButton.style.display = "";
        }
        fullscreenButton.onclick = () => {
          unityInstance.SetFullscreen(1);
         // js 2 c#
         //unityInstance.SendMessage('Demo', 'ChangeColor');
        };
      }
    }).catch((message) => {
      alert(message);
    });
  };
  document.body.appendChild(script);
}

function resumeAudio() {
  try {
    var context = null;
    // Unity 2020+ 通常是 unityInstance.Module.audioContext
    if (typeof unityInstance !== 'undefined' && unityInstance.Module && unityInstance.Module.audioContext) {
      context = unityInstance.Module.audioContext;
    }
    // 兼容旧版本
    if (!context && typeof UnityLoader !== 'undefined' && UnityLoader.instances) {
      for (var key in UnityLoader.instances) {
        if (UnityLoader.instances[key].Module && UnityLoader.instances[key].Module.audioContext) {
          context = UnityLoader.instances[key].Module.audioContext;
          break;
        }
      }
    }
    if (context && context.state === 'suspended') {
      context.resume();
    }
  } catch (e) { }
  // 只执行一次
  document.removeEventListener('click', resumeAudio);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  initializeUnity();
  // UnityLoader/UnityInstance 变量名可能不同，请根据实际情况调整
  document.addEventListener('click', resumeAudio);
}); 
