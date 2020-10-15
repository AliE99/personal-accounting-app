if (!window.W) {
    window.W = {
        setHooks: ({wappWillStart}) => {
            wappWillStart(() => {
            });
        },
        initializeAsync: () => Promise.resolve(),
        user: {getId: () => "myUserId"},
    };
}