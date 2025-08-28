Promise.resolve(2)
        .then((value) => {
            return value * value;
        })
        .then((value) => {
            return value * 2;
        })
        .then((value) => {
            return value + 5;
        })
        .then((result) => {
            console.log(result);
        })