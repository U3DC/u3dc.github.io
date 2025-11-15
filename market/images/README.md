# 产品实拍效果图目录

此目录用于存放产品实拍效果图。

## 使用方法

1. 将您的产品实拍图片放入此 `images` 目录
2. 修改 `script.js` 文件中的 `galleryImages` 数组，将图片文件名替换为您的实际图片文件名

## 图片要求

- 推荐尺寸：400x300 像素或更大
- 支持格式：JPG、PNG、WebP 等常见图片格式
- 建议使用有意义的文件名，如：`product-1.jpg`、`product-2.jpg` 等

## 示例

如果您的图片文件名为：
- `game-box-1.jpg`
- `game-box-2.jpg`
- `game-box-3.jpg`

则在 `script.js` 中修改为：
```javascript
const galleryImages = [
    'images/game-box-1.jpg',
    'images/game-box-2.jpg',
    'images/game-box-3.jpg'
];
```

## 注意事项

- 图片路径是相对于 `index.html` 文件的
- 可以添加任意数量的图片
- 图片会按照数组中的顺序显示

