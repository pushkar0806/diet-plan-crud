<template>
    <div class="add-recipe container">
        <h2 class="center-align indigo-text">Add New Diet</h2>
        <form @submit.prevent="addDiet">
            <div class="field title">
                <label for="title">Diet Time: </label>
                <input type='text' name='title' v-model="title">
            </div>
            <div v-for="(food, index) in ingredients" :key="index" class="field"> 
                <label for="ingredient"> Ingredients: </label>
                <input type="text" name="ingredient" v-model="ingredients[index]"/>
                <i class="material-icons delete" @click="deleteIng(food)">delete</i>
            </div>
            <div class="field add-ingedients">
                <label for="add-ingedients">Add Ingedients: </label>
                <input type='text' name='add-ingedients' @keydown.tab.enter.prevent="add" v-model="newItem">
            </div>
            <div class="field center-align">
                <p class="red-text" v-if="feedback">{{ feedback }}</p>
                <button class="btn green">Add Diet</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';

export default {
    name: 'AddDiet',
    data() {
        return {
            title: null,
            newItem: null,
            feedback: null,
            slug: null,
            ingredients:[]
        }
    },
    methods:{
        addDiet(){
            if(this.title) {
                this.feedback = null;
                this.slug = slugify(this.title, {
                    replacement: '-',
                    lower: true,
                    remove: /[$%^&*()#@:'",+_~]/g
                })
                db.collection('recipes').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug
                }).then(()=>{
                    this.$router.push({name: 'Index'})
                }).catch(err=>{
                    console.log(err);
                    
                })
            } else {
                this.feedback = 'Diet Time is missing!'
            }
        },
        add(){
            if(this.newItem){
                this.ingredients.push(this.newItem);
                this.newItem = null;
                this.feedback = null;
            } else {
                this.feedback = 'You must provide some food item'
            }    
        },
        deleteIng(food) {
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient != food;
            })
        }
    }
}
</script>

<style scoped>
.add-recipe{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}

.add-recipe h2 {
    font-size: 2em; 
    margin: 20px auto;
}
.add-recipe .field {
    margin: 20px auto;
    position: relative;
}

.add-recipe .delete {
    right: 0;
    bottom: 16px;
    position: absolute;
    color: lightgray;
    cursor: pointer;
    font-size: 1.4em;
    }
</style>