<template>
    <div class="text-compo">
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
    props: ['count', 'option'],
    data () {
        return {
            opt: this.option,
            visible: true
        }
    },
    methods : {
        deleteOption() {
            this.$emit('deleteOption', this.opt)
        }
    },
    watch: {
        opt: function (newOption, oldOption){
            this.$emit('ch', this.opt, this.count)
        }
    }
}
</script>