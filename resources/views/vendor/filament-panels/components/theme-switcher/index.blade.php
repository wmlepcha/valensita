{{-- Theme switcher hidden - dark mode is forced --}}
<div
    x-data="{ theme: 'dark' }"
    x-init="
        theme = 'dark'
        localStorage.setItem('theme', 'dark')
        $dispatch('theme-changed', 'dark')
    "
    style="display: none;"
></div>
