<template>
    <div class="text-compo" v-if="visible">
        <div class="text-question multi-option">
            <span class="option-span">{{ count + 1 }}</span>
            <input type="text" placeholder="Enter option" v-model="opt">
        </div>
        <img src="@/assets/bin.svg" alt="delete-icon" class="option-delete" @click="deleteOption">
    </div>
</template>

<script>
export default {
    name: 'Option',
    props: ['count'],
    data () {
        return {
            opt: '',
            visible: true
        }
    },
    methods : {
        deleteOption() {
            this.$emit('deleteOption', this.opt)
            this.visible = false
        }
    },
    watch: {
        opt: function (newOption, oldOption){
            this.$emit('choice', this.opt, this.count)
        }
    }
}
</script>