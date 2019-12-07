<template>
    <div class="navbar">
        <nav class="nav-extended indigo darken-1">
            <div class="nav-content">
                <router-link :to="{name: 'Index'}">
                    <span class="nav-title title">Diet Schedule</span>
                </router-link>
                <a href="" class="btn-floating btn-large halfway-fab green">
                    <router-link  :to="{name: 'AddDiet'}">
                        <i class="material-icons">add</i>
                    </router-link>
                </a> 
            </div>
        </nav>
    </div>
</template>

<script>

export default {
    name: 'Navbar',
    data() {
        return {

        }
    }
}
</script>

<style scoped>
.title{
    align-content: center
}
</style>
