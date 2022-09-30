/// <reference types="@sveltejs/kit" />
/// <reference types="@types/vite" />

declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		onlongpress?: (event: CustomEvent<MouseEvent>) => void;
	}
}
