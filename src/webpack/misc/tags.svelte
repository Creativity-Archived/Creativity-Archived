<script lang="ts">
    export let openSource: string;
    export let messWithSystem: string;
    export let license: string;
    export let type: string;
    export let whatType: string;

    let tagStyle: String;
    let tag: String;

    // If states lol!!!
    if (openSource == "open") {
        tag = "OPEN SOURCE";
        tagStyle = "openSource";
    } else if (openSource == "closed") {
        tag = "CLOSED SOURCE";
        tagStyle = "closedSource";
    }

    if (messWithSystem == "yes") {
        tag = "CAN MESS WITH SYSTEM";
        tagStyle = "canMessSystem";
    } else if (messWithSystem == "no") {
        tag = "CAN NOT MESS WITH SYSTEM";
        tagStyle = "canNotMessSystem";
    }

    if (license) {
        tag = license + " License";
        tagStyle = "license";
    }

    if (type) {
        tag = type.toUpperCase();
        tagStyle = "type";
    } if (whatType) {
        tag = whatType.toUpperCase();
        tagStyle = "whatType";
    }
</script>

<span class="tag {tagStyle}">
    {tag}
</span>

<style>
    .tag {
        background-color: rgba(60, 60, 60, 1);
        width: max-content;
        font-size: 10px;

        padding: 0 5px;

        user-select: none;
        --webkit-user-select: none;
    }

    .openSource {
        background-color: rgba(0, 150, 0, 1);
    }.closedSource {
        background-color: rgba(150, 0, 0, 1);
    }

    .canMessSystem {
        background-color: rgba(150, 150, 0, 1);
    }.canNotMessSystem {
        background-color: rgba(0, 150, 0, 1);
    }

    .license {
        background-color: rgba(200, 200, 200, 1);
        color: rgba(50, 50, 50, 1);
    }

    .type {
        background-color: rgba(120, 60, 180, 1);
    }.whatType {
        background-color: rgba(160, 80, 220, 1);
    }
</style>
