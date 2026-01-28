<script lang="ts">
    export let openSource: string;
    export let messWithSystem: string;
    
    let tagStyle:String;
    let tag:String;
    
    if (openSource == "yes") {
      tag = "OPEN SOURCE"
      tagStyle = "openSource"
    } else if (openSource == "closed") {
      tag = "CLOSED SOURCE"
      tagStyle = "closedSource"
    }
    
    if (messWithSystem == "yes") {
      tag = "CAN MESS WITH SYSTEM"
      tagStyle = "canMessSystem"
    } else if (messWithSystem == "no") {
      tag = "CAN NOT MESS WITH SYSTEM"
      tagStyle = "canNotMessSystem"
    }
</script>

<span class="tag {tagStyle}">
    [ {tag} ]
</span>

<style>
    .tag {
        color: rgba(60, 60, 60, 1);
        width: max-content;
        font-size: 10px;
    }
    
    .openSource {
        color: rgba(0, 150, 0, 1);
    } .closedSource {
        color: rgba(150, 0, 0, 1);
    }
    
    .canMessSystem {
        color: rgba(150, 150, 0, 1);
    } .canNotMessSystem {
        color: rgba(0, 150, 0, 1);
    }
</style>