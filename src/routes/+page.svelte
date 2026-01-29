<!--Interview Done On 26/01/2026 7.30 pm -->


<script>
    import ChildPopup from '$lib/child/ChildPopup.svelte';

    let skill_name = ''
    let experience = ''

    let is_open = false
    let skills = [
        {
            skill_name : "Svelte ",
            experience : "3"
        },
        {
            skill_name : "React ",
            experience : "2"
        },

    ]

    function handle_open_skill_popup(){
        is_open = true
    }

    function handle_save_skill(){
        skills.push({
            skill_name,
            experience
        })

        skills = [...skills]

        experience = ""
        skill_name = ""

        is_open = false
    }

</script>


<div class="main_container">



    {#if is_open}
        <ChildPopup
                bind:skill_name
                bind:experience
                bind:is_open
                on:click={handle_save_skill}
        />
    {/if}

    <div class="man_skills_container">
        {#if skills.length}
            <table>
                <thead>
                    <tr>
                        <td>Skill Name</td>
                        <td>Experience</td>
                    </tr>
                </thead>
                <tbody>
                {#each skills as individual_skills}
                <tr>
                    <td>{individual_skills.skill_name}</td>
                    <td>{individual_skills.experience}</td>
                </tr>
                {/each}
                </tbody>
            </table>
            <div class="button_container">
                <button class="add_skills" on:click={handle_open_skill_popup}>
                    Add a skill
                </button>
            </div>

<!--            -->
<!--            -->
<!--            -->
<!--            {#each skills as individual_skills}-->
<!--                <div class="skill_container">-->
<!--                    <h5>Skill Name : {individual_skills.skill_name}</h5>-->
<!--                    <p>Experience : {individual_skills.experience}</p>-->
<!--                </div>-->
<!--            {/each}-->
        {/if}
    </div>

</div>




<style>
    table{
        border-collapse: collapse;
        width: 40%;
        margin-top: 20px;
        margin-inline: auto;
    }
    th{
        border: 1px solid #000;
        padding: 10px;
    }
    tr{
        border: 1px solid #000;
        padding: 10px;
    }
    td{
        border: 1px solid black;
        padding-left: 5px;
    }

    .main_container{
        padding-inline: 40px;
        width: 100%;
        text-align: center;
    }

    tr td{
        padding-block: 10px;
    }

    .button_container{
        padding-top: 25px;
    }
</style>