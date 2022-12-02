<?php
/**
 * Plugin Name:     Dagens_fto
 * Description:     Att leva med ordens regel och bönen
 * Version:         0.1
 * Author:          Johannes Lindén
 * Author URI:      http://godesity.se/
*/
add_action( 'rest_api_init', 'wpfto_register_routes' );

function wpfto_register_routes() {
  register_rest_route(
    'fto/v1',
    '/login',
    array(
          'methods' => 'POST',
          'callback' => 'wpfto_api_login',
    ), true
  );
  register_rest_route(
      'fto/v1',
      '/pages',
      array(
            'methods' => 'GET',
            'callback' => 'wpfto_reply_with_script',
			'permission_callback' => function () {
			  return in_array($_GET['file'], ['dagens_frans', 'pray_day', 'pray_day_no', 'dagens_pray', 'dagens_sats','dagens_sats_no' ]);
			}
      ), true,
  );

}
function is_user_api_logged_in () {
  return isset($_COOKIE["wp_user_logged_in"]) && $_COOKIE["wp_user_logged_in"] == 1;
  //return isset($_SESSION["wp_user_logged_in"]) && $_SESSION["wp_user_logged_in"] == 'loggedin'; // is_user_logged_in();
}
function wpfto_api_login ($data) {
  if (isset($_POST['user'], $_POST['pwd'])) {
    $usr = wp_authenticate($_POST['user'], $_POST['pwd']);
    if ($usr->data && isset($usr->data->ID)) {
      setcookie("wp_user_logged_in", 1, time() + 31556926);
      $_SESSION["wp_user_logged_in"] = 'loggedin';
      return array('message' => "yepp");
    }
    return array('error' => "nope");
  }
  return array('error' => "no credentials available");
}

function wpfto_reply_with_script($data=NULL) {
	$PHP_BIN_BASE = 'http://fto.st/php-bin/';
	$file = $_GET['file'] . '.php';
	return file_get_contents($PHP_BIN_BASE . $file);
}
function wpfto_api_app($data=NULL) {
	$PHP_BASE = 'https://johannes.godesity.se/fto/app/';
	$file = explode('/fto/v1/app/', $_SERVER["REQUEST_URI"])[1];
	return file_get_contents($PHP_BASE . $file);
}

function wpfto_custom_redirects() {
    if ( str_contains($_GET["app"], '/wordpress/fto/v1/app') ) {
        $PHP_BASE = 'https://johannes.godesity.se/fto/app/';
        $file = explode('/fto/v1/app/', $_GET["app"])[1];
        echo file_get_contents($PHP_BASE . $file);
        die;
    }
}
add_action( 'template_redirect', 'wpfto_custom_redirects' );
?>
