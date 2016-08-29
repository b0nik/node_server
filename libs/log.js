module.exports=function (...args) {
    console.log([new Date().toISOString(),args].toString())
};