<template>
     <div class="main-container">
        <aside>
            <div class="aside-content">
                <h1 class="aside-heading">Bad Roger</h1>
                <a class="svgg" @click="changeDescription">
                    <img src="../assets/info.svg">
                </a>
                <p class="asideParagraph aso" :class="{asideShow : showPara}">Conversational Form</p>
        </div>
            <h5><a href="http://hackncs.com" target="_blank">Nibble Computer Society</a></h5>
        </aside>
        <main class="login-layout">
            <div class="mess">
                <div class="kattu">
                    <div class="left">
                        <img src="@/assets/robot.png" class="chat-icon left-icon">
                        <div class="msg">
                            Fill those login details, human!
                        </div>
                    </div>
                    <div class="right">
                        <div class="msg">Aight, I'm on it.</div>
                        <img src="@/assets/boy.png" class="chat-icon right-icon">
                    </div>
                    <div class="login-input">
                        <form>
                            <input type="text" class="login-field" placeholder="Infoconnect username">
                            <input type="text" class="login-field" placeholder="Password">
                            <button class="btn-login">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data () {
        return {
            showPara : false
        }
    },
    methods: {
        changeDescription() {
            this.showPara = !this.showPara
        }
    }
}
</script>

<style>

</style>