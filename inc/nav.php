<!-- Start: Navbar Right Links -->
<nav class="navbar navbar-expand-md header">
    <div class="container">
        <a href="/index.php">
            <img src="https://brightacademy.ge/assets/img/Logo-horisontal-Color.png?h=a84d9c886982b2d304ef07b4789cd8ba" width="256" height="129">
        </a>
        <a class="navbar-brand d-flex align-items-center" href="/"></a>
        <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-2">
            <span class="visually-hidden">Toggle navigation</span>
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navcol-2">
            <ul class="navbar-nav ms-auto">
                <?php
                $currentPage = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
                $pages = [
                    'https://brightacademy.ge/index.php' => 'მთავარი',
                    'https://brightacademy.ge/brighacademy.php' => 'ჩვენს შესახებ',
                    'https://brightacademy.ge/services.php' => 'სერვისები',
                    'https://brightacademy.ge/blog.php' => 'ბლოგი',
                    'https://brightacademy.ge/contact.php' => 'კონტაქტი',
                ];
                foreach ($pages as $page => $label) {
                    $isActive = (strpos($currentPage, $page) !== false) ? 'active' : '';
                    echo '<li class="nav-item">';
                    echo '<a class="nav-link ' . $isActive . '" data-bss-hover-animate="pulse" href="' . $page . '">' . $label . '</a>';
                    echo '</li>';
                }
                ?>
            </ul>
        </div>
    </div>
</nav>
<!-- End: Navbar Right Links -->