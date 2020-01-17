<template>
    <div class="text-compo">
        <div class="text-question multi-option">
            <span class="option-span">{{ count + 1 }}</span>
            <input type="text" placeholder="Enter option" v-model="opt">
        </div>
        <img src="@/assets/bin.svg" alt="delete-icon" class="option-delete">
    </div>
</template>

<script>
export default {
    name: 'Option',
    props: ['count'],
    data () {
        return {
            opt: ''
        }
    },
    watch: {
        opt: function (newOption, oldOption){
            this.$emit('choice', this.opt, this.count)
        }
    }
}
</script>