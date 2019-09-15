<template>
  <span 
    class="magic-word"
    @mouseover="isOver = true"
    @mouseleave="isOver = false">
      {{ word }}
      <transition name="fade">
        <div class="magic-word__word-inner"
      :class="{'magic-word__word-inner-isOver': isOver}" v-if="isOver">
            {{ meaning }} 
            <br />
            <span class="example-text">{{ example }}</span>
        </div>
    </transition>
    </span>
</template>

<script>
export default {

  name: 'MagicWord',

  data() {
    return {
      isOver: false,
      fetched: false,
      content: null,
      example: null
    }
  },

  props: {
    word: {
      type: String,
      required: true
    },
    example: {
        type: String,
        required: true 
    },
    meaning: {
        type: String,
        required: true 
    }
  },

  watch: {
      // async isOver (n) {
      //   if (n && !this.fetched) {
      //       try {
      //           let r = await fetch('https://hackapi.vuewordpress.io/api/v1/words' + this.word)
      //           let response = await r.json()
      //           this.content = response[0].meaning
      //           this.example = response[0].example ? response[0].example : ''
      //           this.fetched = true
      //       } catch (err) {
      //           console.error(err)
      //       }
      //   }
      // }
  }
}
</script>

<style>

  .magic-word__word-inner{
    position: absolute;
    top: -80px;
    left: 30px;
    /* transform: translateX(-50%); */
    padding: 12px 15px;
    text-align: center;
    min-width: 200px;
    color: #fff;
    background-color: #5c22b2;
    border-radius: 16px;
    font-size: 1.1rem;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    z-index: 99999 !important;
  }

  .v-card > ul:first-of-type .magic-word__word-inner{
    left: 30px;
    top: initial;
    bottom: -80px;
  }


  .magic-word{
    position: relative;
    cursor: pointer;
    padding: 4px !important;
    border-radius: 5px !important;
    background-color: rgba(0, 131, 143, 0.8);
    white-space: nowrap;
    display: inline-block;
  } 

  .example-text {
      font-style: italic;
      position: relative;
      padding: 0 8px;
  }

  .example-text::after {
      content: '';
      position: absolute;
      top: 0;
      left: -10px;
      width: 5px;
      height: 100%;
      background-color: red
  }

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.fade-leave-active {
  pointer-events: none;
}



</style>