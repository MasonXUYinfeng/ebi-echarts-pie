define(["./dimension", "./measure", "./setting"],
    function (dimension, measures, setting) {

        var dimensions = {
            uses: "dimensions",
            min: 1,
            max: 1,
            items: dimension
        };

        var measures = {
            uses: "measures",
            min: 1,
            max: 10,
            items: measures
        };

        var sorting = {
            uses: "sorting"
        };

        return {
            type: "items",
            component: "accordion",
            items: {
                dimensions: dimensions,
                measures: measures,
                sorting: sorting,
                layout1: {
                    type: "items",
                    label: "设置",
                    items: {
                        setting: setting,
                    }
                }
            }
        };
    });