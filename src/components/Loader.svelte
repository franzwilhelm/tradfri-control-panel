<style lang="scss">
@keyframes ripple {
    0% {
        top: 96px;
        left: 96px;
        width: 0;
        height: 0;
        opacity: 1;
    }
    100% {
        top: 18px;
        left: 18px;
        width: 156px;
        height: 156px;
        opacity: 0;
    }
}
@keyframes light {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);       
    }
}
.ripple {
    width: 200px !important;
    height: 200px !important;
    display: inline-block;
    transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
    div {
        box-sizing: content-box;
        position: absolute;
        border-width: 4px;
        border-style: solid;
        opacity: 0;
        border-radius: 50%;
        animation: ripple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        animation-delay: 0.2s;
        &:nth-child(2) {
            border-color: black;
            animation-delay: 1s;
        }
    }
    i {
        animation: light 1s ease-in-out;
        animation-iteration-count: 1;
        position: absolute;
        top: 89px;
        left: 89px;
        animation-delay: -0.5s;
    }
}
</style>

<div class="ripple">
    <i class="fas fa-lightbulb fa-2x"></i>
    <div></div>
    <div></div>
</div>
