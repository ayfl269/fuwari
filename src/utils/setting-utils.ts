import {
	AUTO_MODE,
	DARK_MODE,
	DEFAULT_BG_BLUR,
	DEFAULT_THEME,
	LIGHT_MODE,
} from "@constants/constants.ts";
import { expressiveCodeConfig } from "@/config";
import type { LIGHT_DARK_MODE } from "@/types/config";

export function getDefaultHue(): number {
	const fallback = "250";
	const configCarrier = document.getElementById("config-carrier");
	return Number.parseInt(configCarrier?.dataset.hue || fallback, 10);
}

export function getHue(): number {
	const stored = localStorage.getItem("hue");
	return stored ? Number.parseInt(stored, 10) : getDefaultHue();
}

export function getHideBackground(): boolean {
	const stored = localStorage.getItem("hideBackground");
	return stored ? stored === "true" : false;
}

export function getDefaultBackgroundBlur(): number {
	return DEFAULT_BG_BLUR;
}

export function getBackgroundBlur(): number {
	const stored = localStorage.getItem("backgroundBlur");
	return stored ? Number.parseInt(stored, 10) : DEFAULT_BG_BLUR;
}

export function setHue(hue: number): void {
	localStorage.setItem("hue", String(hue));
	const r = document.querySelector(":root") as HTMLElement;
	if (!r) {
		return;
	}
	r.style.setProperty("--hue", String(hue));
}

export function setBackgroundBlur(blur: number): void {
	if (blur === DEFAULT_BG_BLUR) {
		localStorage.removeItem("backgroundBlur");
	} else {
		localStorage.setItem("backgroundBlur", String(blur));
	}
	const r = document.querySelector(":root") as HTMLElement;
	if (!r) {
		return;
	}
	r.style.setProperty("--bg-blur", `${blur}px`);
}

export function setHideBackground(hide: boolean): void {
	localStorage.setItem("hideBackground", String(hide));

	// Apply changes
	const bgUrl = getComputedStyle(document.documentElement)
		.getPropertyValue("--bg-url")
		.trim();
	const bgEnable = getComputedStyle(document.documentElement)
		.getPropertyValue("--bg-enable")
		.trim();

	if (hide) {
		document.body.classList.remove("bg-loaded");
		document.documentElement.style.removeProperty("--card-bg");
		document.documentElement.style.removeProperty("--float-panel-bg");
	} else {
		if (bgUrl && bgUrl !== "none" && bgEnable === "1") {
			document.body.classList.add("bg-loaded");
			document.documentElement.style.setProperty(
				"--card-bg",
				"var(--card-bg-transparent)",
			);
			document.documentElement.style.setProperty(
				"--float-panel-bg",
				"var(--float-panel-bg-transparent)",
			);
		}
	}
}

export function applyThemeToDocument(theme: LIGHT_DARK_MODE): void {
	switch (theme) {
		case LIGHT_MODE:
			document.documentElement.classList.remove("dark");
			break;
		case DARK_MODE:
			document.documentElement.classList.add("dark");
			break;
		case AUTO_MODE:
			if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
			break;
	}

	// Set the theme for Expressive Code
	document.documentElement.setAttribute(
		"data-theme",
		expressiveCodeConfig.theme,
	);
}

export function setTheme(theme: LIGHT_DARK_MODE): void {
	localStorage.setItem("theme", theme);
	applyThemeToDocument(theme);
}

export function getStoredTheme(): LIGHT_DARK_MODE {
	return (localStorage.getItem("theme") as LIGHT_DARK_MODE) || DEFAULT_THEME;
}
