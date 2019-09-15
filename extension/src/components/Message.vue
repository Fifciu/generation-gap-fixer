<template>
  <div class="bez-magic-word">
    <template
        v-for="(node, index) in nodes"
        
    >
        <span :key="index" v-if="node.type === 'basic'">{{node.word}}{{ index < nodes.length - 1 ? ' ' : '' }}</span>
        <template v-else>
            <MagicWord 
              :key="index" 
              :word="node.word" 
              :meaning="node.meaning"
              :example="node.example"/>
              <span :key="node.meaning">{{ index < nodes.length - 1 ? ' ' : '' }}</span>
        </template>
    </template>
  </div>
</template>

<script>
import MagicWord from './MagicWord.vue'

export default {

  name: 'Message',

  components: {
      MagicWord
  },

  data() {
    return {
      nodes: [],
      fetched: false
    }
  },

  props: {
    content: {
      type: String,
      required: true
    }
  },

 async created () {
     if (!this.fetched) {
            try {
                let r = await fetch('https://hackapi.vuewordpress.io/api/v1/translation/get-words/?words=' + this.content)
                let resp = await r.json()
                // console.log(response)
                const response = resp.reduce((total, curr) => {
                        total[curr.word] = {
                            meaning: curr.meaning,
                            example: curr.example
                        }
                        return total
                    }, {})
 
                     const words = this.content.split(' ')
    const parts = []
    for (let word of words) {
        if (response.hasOwnProperty(word)) {
            parts.push({
                type: 'special',
                word,
                meaning: response[word].meaning,
                example: response[word].example
            })
        } else {
            parts.push({
                type: 'basic',
                word
            })
        }
    }
    this.$set(this, 'nodes', parts)
                // this.content = response[0].meaning
                // this.example = response[0].example ? response[0].example : ''
                // this.fetched = true
            } catch (err) {
                console.error(err)
            }
        }
   
  }

}
</script>

<style>
  .magic-word__word {
    position: relative;
    transition: all .2s;
  }

  .magic-word-isOver {
    position: absolute;
    top: 20px;
    left: 20px;
    color: #fff;
    background-color: #6c6c6c;
  }

  
</style>