/**
 * 
 * @param {string} parentPath  父路径
 * @param {string} childPath 子路径
 * @returns 
 */
export const resolveRoutePath = (parentPath, childPath) => {
  // 如果子路径是绝对路径，则直接返回子路径
  if (childPath.startsWith('/')) {
    return childPath;
  }
  // 如果父路径不以斜杠结尾，则添加斜杠
  if (!parentPath.endsWith('/')) {
    parentPath += '/';
  }
  return parentPath + childPath;
}

/**
 * 
 * @param {string} fullPath
 * @returns 
 */
export const toCamelCase = (fullPath) => {
  // 移除开头的斜杠（如果存在），然后按斜杠分割
  const parts = fullPath.replace(/^\//, '').split('/');
  // 将每个部分转换为驼峰命名：保持第一个单词不变，其余每个单词首字母大写
  return parts.map((part, index) => {
    // 如果是第一个单词，保持原样
    if (index === 0) return part;
    // 其他单词，首字母大写
    return part.charAt(0).toUpperCase() + part.slice(1);
  }).join(''); // 重新连接成一个字符串
}