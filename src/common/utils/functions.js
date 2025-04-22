const isTrue = (value) => ["true", true, 1].includes(value);
const isFalse = (value) => ["false", false, 0].includes(value);

module.exports = {
    isTrue,
    isFalse
}