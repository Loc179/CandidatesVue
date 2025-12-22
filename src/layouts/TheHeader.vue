<script setup>

</script>

<template>
    <div class="header display-flex" id="header">
        <!-- Header left -->
        <div class="header-left display-flex">
            <div class="logo-container display-flex align-items-center">
                <div class="icon icon-menu"></div>
                <div class="icon-default icon-logo logo"></div>
                <div class="logo-name">Tuyển dụng</div>
            </div>

            <div class="header-search display-flex align-items-center">
                <div class="header-search-box display-flex align-items-center">
                    <div class="icon icon-search"></div>
                    <input type="text" class="header-search-input" placeholder="Tìm kiếm tin tuyển dụng, ứng viên, nhân tài...">
                </div>
            </div>
        </div>

        <!-- Header right -->
        <div class="header-right display-flex align-items-center">
            <div class="header-recruiment display-flex align-items-center">
                <div class="icon icon-recruiment"></div>
                <div class="header-recruiment-text">Website tuyển dụng</div>
            </div>
            
            <div class="icon icon-notification pointer"></div>
            <div class="icon icon-integration pointer"></div>
            
            <div class="user-control display-flex align-items-center justify-content-center">
                <div class="icon-item">
                    <div class="icon icon-invite pointer"></div>
                </div>
                <div class="icon-item">
                    <div class="icon icon-message pointer"></div>
                </div>
                <div class="icon-item">
                    <div class="icon icon-notification-user pointer"></div>
                </div>
                <div class="icon-item">
                    <div class="icon icon-help pointer"></div>
                </div>
                <div class="icon-item">
                    <div class="icon icon-more-menu pointer"></div>
                </div>
                
                <div class="icon-item">
                    <div class="icon icon-knowledge pointer"></div>
                </div>
                
                <div class="">
                    <div class="icon icon-avatar pointer"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    /* Header */
.container .header {
    width: 100%;
    height: 48px;
    background-color: white;
    justify-content: space-between;
}

/* Header left */
.header .header-left {
    /* background-color: red; */
    height: 100%;
    width: auto;
    max-width: 650px;
}

.header .logo-container {
    width: auto;
    height: 100%;
    gap: 8px;
    padding: 0 16px;
}

.header .logo-container .logo {
    margin-left: 24px;
}

.header .logo-container .logo-name {
    font-size: 18px;
    font-weight: 600;
    color: black;
}

.header-search {
    flex: 1;
    height: 100%;
}

.header-search .header-search-box {
    height: 50%;
    width: 360px;
    background: #f2f2f2;
    border-radius: 4px;
    padding: 4px 6px;
    gap: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.header-search .header-search-input {
    border: none;
    outline: none;
    background: transparent;
    width: 100%;
    font-size: 14px;
}

.header-search .header-search-input::placeholder {
    opacity: 0.5;
}

/* Header right */

.header .header-right {
    /* background-color: green; */
    margin-right: 24px;
    height: 100%;
    gap: 10px;
}

.header .header-recruiment {
    gap: 8px;
}

.header .header-recruiment:hover {
    color: #5598fc;
    cursor: pointer;
}

.header .header-recruiment:hover .icon {
    background-color: #5598fc;
}

.header .header-recruiment-text {
    font-size: 14px;
    font-weight: 500;
    padding: 4px 0;
}

.header .user-control {
    gap: 12px;
    padding: 0 10px;
}
</style>