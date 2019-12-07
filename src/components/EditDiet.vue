<template>
   <div v-if="editDiet"  class="edit-diet container">
       <form @submit.prevent="EditDiet">
            <div class="field title">
                <label for="title">Diet Time: </label>
                <input type='text' name='title' v-model="editDiet.title">
            </div>
            <div v-for="(food, index) in editDiet.ingredients" :key="index" class="field"> 
                <label for="ingredient"> Ingredients: </label>
                <input type="text" name="ingredient" v-model="editDiet.ingredients[index]"/>
                <i class="material-icons delete" @click="deleteIng(food)">delete</i>
            </div>
            <div class="field add-ingedients">
                <label for="add-ingedients">Add Ingedients: </label>
                <input type='text' name='add-ingedients' @keydown.tab.enter.prevent="add" v-model="newItem">
            </div>
            <div class="field center-align">
                <p class="red-text" v-if="feedback">{{ feedback }}</p>
                <button class="btn green">Update Diet</button>
            </div>
        </form>
   </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';

export default {
    name: 'EditDiet',
    data() {
        return {
            editDiet: null,
            newItem: null,
            feedback: null
        }
    },
    methods: {
        deleteIng(food) {
            this.editDiet.ingredients = this.editDiet.ingredients.filter(ingredient => {
                return ingredient != food;
            })
        },
        add(){
            if(this.newItem){
                this.editDiet.ingredients.push(this.newItem);
                this.newItem = null;
                this.feedback = null;
            } else {
                this.feedback = 'You must provide some food item'
            }    
        },
        EditDiet() {
            if(this.editDiet.title) {
                this.feedback = null;
                this.editDiet.slug = slugify(this.editDiet.title, {
                    replacement: '-',
                    lower: true,
                    remove: /[$%^&*()#@:'",+_~]/g
                })
                db.collection('recipes').doc(this.editDiet.id).update({
                    title: this.editDiet.title,
                    ingredients: this.editDiet.ingredients,
                    slug: this.editDiet.slug
                }).then(()=>{
                    this.$router.push({name: 'Index'})
                }).catch(err=>{
                    console.log(err);
                    
                })
            } else {
                this.feedback = 'Diet Time is missing!'
            }
        }
    },
    created() {
        let doc = db.collection('recipes').where('slug', '==', this.$route.params.diet_slug)
        doc.get().then((item) => {
            item.forEach(element => {
                console.log(element);
                this.editDiet = element.data()
                this.editDiet.id = element.id;
            });
            
        })
    }
}
</script>
<style scoped>
.edit-diet{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}

.edit-diet h2 {
    font-size: 2em; 
    margin: 20px auto;
}
.edit-diet .field {
    margin: 20px auto;
    position: relative;
}

.edit-diet .delete {
    right: 0;
    bottom: 16px;
    position: absolute;
    color: lightgray;
    cursor: pointer;
    font-size: 1.4em;
    }
</style>