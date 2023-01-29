const clean = function (subject) {
    Object.keys(subject).forEach(key => {
        if (!subject[key] && !(subject[key] instanceof Boolean) && 0 !== subject[key]) {
            delete subject[key];
        }

        if (subject[key] instanceof Array && 0 === subject[key].length) {
            delete subject[key];
        }
    })

    return subject;
};

const prepare = function (subject) {
    let object = {};
    Object.keys(subject).forEach(key => {
        if (subject[key] instanceof Array) {
            subject[key].forEach((value, index) => {
                value && (object[`${key}[${index}]`] = value);
            })
            return;
        }

        if (true === subject[key] || false === subject[key]) {
            object[key] = +subject[key];
            return;
        }

        object[key] = subject[key];
    })
    return object;
}

export function serialize(query) {
    return new URLSearchParams(prepare(clean(query))).toString();
}