<script lang="ts">
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import Icon from "@iconify/svelte";
import {
	getBackgroundBlur,
	getDefaultBackgroundBlur,
	getDefaultHue,
	getHideBackground,
	getHue,
	setBackgroundBlur,
	setHideBackground,
	setHue,
} from "@utils/setting-utils";

let hue = getHue();
const defaultHue = getDefaultHue();

let hideBackground = getHideBackground();
let blurLevel = getBackgroundBlur();
const defaultBlur = getDefaultBackgroundBlur();

function resetHue() {
	hue = getDefaultHue();
}

function resetBlur() {
	blurLevel = defaultBlur;
}

$: if (hue || hue === 0) {
	setHue(hue);
}

$: if (hideBackground !== undefined) {
	setHideBackground(hideBackground);
}

$: if (blurLevel !== undefined) {
	setBackgroundBlur(blurLevel);
}
</script>

<div id="display-setting" class="float-panel float-panel-closed absolute transition-all w-80 right-4 px-4 py-4">
    <div class="flex flex-row gap-2 mb-3 items-center justify-between">
        <div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
            before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
            before:absolute before:-left-3 before:top-[0.33rem]"
        >
            {i18n(I18nKey.themeColor)}
            <button aria-label="Reset to Default" class="btn-regular w-7 h-7 rounded-md  active:scale-90 will-change-transform"
                    class:opacity-0={hue === defaultHue} class:pointer-events-none={hue === defaultHue} on:click={resetHue}>
                <div class="text-[var(--btn-content)]">
                    <Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.875rem]"></Icon>
                </div>
            </button>
        </div>
        <div class="flex gap-1">
            <div id="hueValue" class="transition bg-[var(--btn-regular-bg)] w-10 h-7 rounded-md flex justify-center
            font-bold text-sm items-center text-[var(--btn-content)]">
                {hue}
            </div>
        </div>
    </div>
    <div class="w-full h-6 px-1 bg-[oklch(0.80_0.10_0)] dark:bg-[oklch(0.70_0.10_0)] rounded select-none">
        <input aria-label={i18n(I18nKey.themeColor)} type="range" min="0" max="360" bind:value={hue}
               class="slider" id="colorSlider" step="5" style="width: 100%">
    </div>

    <div class="flex flex-row gap-2 mb-3 items-center justify-between mt-4">
        <div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
            before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
            before:absolute before:-left-3 before:top-[0.33rem]"
        >
            {i18n(I18nKey.backgroundBlur)}
            <button aria-label="Reset to Default" class="btn-regular w-7 h-7 rounded-md  active:scale-90 will-change-transform"
                    class:opacity-0={blurLevel === defaultBlur} class:pointer-events-none={blurLevel === defaultBlur} on:click={resetBlur}>
                <div class="text-[var(--btn-content)]">
                    <Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.875rem]"></Icon>
                </div>
            </button>
        </div>
        <div class="flex gap-1">
            <div id="blurValue" class="transition bg-[var(--btn-regular-bg)] w-10 h-7 rounded-md flex justify-center
            font-bold text-sm items-center text-[var(--btn-content)]">
                {blurLevel}px
            </div>
        </div>
    </div>
    <div class="w-full h-6 bg-[var(--btn-regular-bg)] rounded select-none overflow-hidden">
        <input aria-label={i18n(I18nKey.backgroundBlur)} type="range" min="0" max="20" bind:value={blurLevel}
               class="slider" id="blurSlider" step="1" style="width: 100%"
               style:background={`linear-gradient(to right, var(--primary) ${blurLevel * 5}%, transparent ${blurLevel * 5}%)`}>
    </div>

    <div class="flex flex-row gap-2 mb-3 items-center justify-between mt-4">
        <div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
            before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
            before:absolute before:-left-3 before:top-[0.33rem]"
        >
            {i18n(I18nKey.disableBackground)}
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
            <input aria-label={i18n(I18nKey.disableBackground)} type="checkbox" bind:checked={hideBackground} class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[var(--primary)]"></div>
        </label>
    </div>
</div>


<style lang="stylus">
    #display-setting
      input[type="range"]
        -webkit-appearance none
        height 1.5rem
        background-color transparent
        transition background-image 0.15s ease-in-out

      #colorSlider
        background-image var(--color-selection-bar)

      #blurSlider
        border-radius 0.25rem
        &::-webkit-slider-thumb
          appearance none
          width 0
          height 0
          opacity 0
        &::-moz-range-thumb
          appearance none
          width 0
          height 0
          opacity 0
        &::-ms-thumb
          appearance none
          width 0
          height 0
          opacity 0

      input[type="range"]
        /* Input Thumb */
        &::-webkit-slider-thumb
          -webkit-appearance none
          height 1rem
          width 0.5rem
          border-radius 0.125rem
          background rgba(255, 255, 255, 0.7)
          box-shadow none
          &:hover
            background rgba(255, 255, 255, 0.8)
          &:active
            background rgba(255, 255, 255, 0.6)

        &::-moz-range-thumb
          -webkit-appearance none
          height 1rem
          width 0.5rem
          border-radius 0.125rem
          border-width 0
          background rgba(255, 255, 255, 0.7)
          box-shadow none
          &:hover
            background rgba(255, 255, 255, 0.8)
          &:active
            background rgba(255, 255, 255, 0.6)

        &::-ms-thumb
          -webkit-appearance none
          height 1rem
          width 0.5rem
          border-radius 0.125rem
          background rgba(255, 255, 255, 0.7)
          box-shadow none
          &:hover
            background rgba(255, 255, 255, 0.8)
          &:active
            background rgba(255, 255, 255, 0.6)

</style>
