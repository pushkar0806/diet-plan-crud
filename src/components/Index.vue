<template>
  <div class="index container">
   <div class="card" v-for="(recipe, index) in recipes" :key="recipe.id">
     <div class="card-content">
       <i class="material-icons delete" @click="deleteDiet(recipe.id)">delete</i>
       <h2 class="indigi-text">{{ recipe.title }}</h2>
       <ul class="ingredients">
         <li v-for="(item, index) in recipe.ingredients" :key="index">
           <span class="chip">{{ item }}</span>
         </li>
       </ul>
     </div>
     <span class="btn-floating btn-large halfway-fab pink">
       <router-link :to="{name: 'EditDiet', params: {diet_slug: recipe.slug } }">
       <i class="material-icons">edit</i>
       </router-link>
     </span>
   </div>
  </div>
</template>

<script>
// Importing fireStore DB
import db from '@/firebase/init';

export default {
  name: 'Index',
  data () {
    return {
      recipes: [] 
  }
},
methods: {
  deleteDiet(id) {
    db.collection('recipes').doc(id).delete()
      .then(() => {
      this.recipes = this.recipes.filter(item => {
        return item.id != id;
      });
    })
  }
},
created() {
  // fetching data from DB
  db.collection('recipes').get()
  .then(plan => {
    plan.forEach(item => {
      console.log(item);
      let recipe = item.data();
      recipe.id = item.id;
      this.recipes.push(recipe)
    });
  })
  .catch(err => console.log(err));
  
}
}
</script>

<style scoped>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}

.index h2 {
  font-size: 2em;
  text-align: center;
  margin-top: 0;
}

.index ingredients {
  margin: 35px auto;
}

.index ingredients li {
  display: inline-block
}

.delete {
  position: absolute;
  top:4px;
  right: 4px;
  cursor: pointer;
  color: brown;
  font-size: 1.8em;
}
</style>  