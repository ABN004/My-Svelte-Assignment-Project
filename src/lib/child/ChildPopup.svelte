<script>
    export let skill_name = ""
    export let experience = ""
    export let is_open = false

    function handle_cancel(){
        is_open = false
    }
</script>

<dialog>
    <div class="form_container">
        <div class="inputs">
            <input type="text" placeholder="Skill name" bind:value={skill_name}>
            <input type="text" placeholder="No of Years Experience" bind:value={experience}>
        </div>
        <div class="button_container">
            <button on:click>save</button>
            <button on:click={handle_cancel}>cancel</button>
        </div>
    </div>


</dialog>



<style>
    dialog  {

        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border-radius: 10px;
        padding: 20px;
    }

    .form_container{
        display: flex;
        flex-direction: column;
        gap: 10px;
        height: 400px;
        width: 400px;
    }

</style>