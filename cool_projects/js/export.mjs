function preorder( tree ) {
	let ret = tree.value;
	if ( tree.left != null )
		ret += preorder( tree.left );
	if ( tree.right != null )
		ret += preorder( tree.right );
	return ret;
}
export { preorder };
