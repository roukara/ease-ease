export function evaluateFunction(value) {
  try {
    if (!/^[\w\s()*+\-\/.%]*t[\w\s()*+\-\/.%]*$/.test(value)) {
      throw new Error('Invalid expression');
    }
  
    const func = new Function('t', `return ${value}`);
  
    if (!(typeof func(Math.random()) === 'number')) {
      throw new Error('Invalid expression');
    }
  
    return func;
  } catch (error) {
    return error;
  }
}