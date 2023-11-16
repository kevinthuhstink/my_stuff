"vundle {{{
set nocompatible              " required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

" let Vundle manage Vundle, required
Plugin 'gmarik/Vundle.vim'
Plugin 'universal-ctags/ctags'
Plugin 'majutsushi/tagbar'
Plugin 'tpope/vim-surround'
Plugin 'tpope/vim-fugitive'
Plugin 'c.vim'
Plugin 'vim-airline/vim-airline'
Plugin 'dense-analysis/ale'
Plugin 'scrooloose/nerdtree'

" web dev plugins
Plugin 'mattn/emmet-vim'
Plugin 'AndrewRadev/tagalong.vim'
Plugin 'scrooloose/syntastic'
Plugin 'pangloss/vim-javascript'
Plugin 'jelera/vim-javascript-syntax'
Plugin 'mxw/vim-jsx'

call vundle#end()            " required
filetype plugin indent on    " required
"
" end vundle }}}

" default {{{
set tabstop=4
set shiftwidth=4
" set expandtab
set number
set nowrap
set autoindent
set hlsearch
set incsearch
set foldmethod=marker
set foldlevelstart=0
set viminfo='1000,f1
colorscheme taro
let g:user_emmet_mode='n'
let g:user_emmet_install_global = 0

" end default }}}

" vimscript {{{

" <buffer> tells vim to only consider something when in the buffer where it
" was defined
augroup filetype_c
	autocmd!
	autocmd Filetype c setlocal foldmethod=syntax
augroup END

augroup filetype_java
	autocmd!
	autocmd Filetype java setlocal foldmethod=syntax
	" auto-writes public class [fname] { } ( :i is dysfunctional )
	" note that vim uses "" for special characters ( \\, \n )
	" but '' tells vim to ignore special characters
	" autocmd BufNewFile *.java execute echom public class jk\"%pbdiwxA {\n}jkO
	" autocmd BufNewFile *.java execute Javanew( "% )
	autocmd Filetype java iabbrev <buffer> AL ArrayList<
	autocmd Filetype java iabbrev <buffer> HM HashMap<
	autocmd Filetype java iabbrev <buffer> L List<
augroup END

augroup filetype_python
	autocmd!
	autocmd Filetype python setlocal foldmethod=indent
	autocmd Filetype python nnoremap <buffer> <leader>c I#<esc>
	autocmd Filetype python nnoremap <buffer> <leader>c ^x
augroup END

" augroup filetype_javascript
	" autocmd!
	" autocmd Filetype javascript setlocal foldmethod=syntax
" augroup END

"html files are tabbed 2
augroup web-dev
	autocmd!
	autocmd Filetype html,css,javascript setlocal tabstop=2 shiftwidth=2 expandtab
	autocmd Filetype css setlocal foldmarker={,}
	autocmd Filetype html,css,javascript EmmetInstall
augroup END

" revert changes even after saving
if version >= 703
	set undodir=~/.vim/backup
	set undofile
	set undoreload=10000
endif

" end vimscript }}}

" remapping {{{
let mapleader=" "
" No more stretching all the way for <esc> when exiting modes
inoremap jk <esc>
vnoremap jk <esc>
" Quickly access the start of the line
inoremap wf <esc>I
" Seach optimization ( <cr> is enter key )
nnoremap <leader>h :nohlsearch<cr>
nnoremap <leader>w /\v\s+$<cr>
nnoremap <leader>W /\v\s+$<cr>diw
nnoremap / /\v
" Remapping keys to make macros, folds, marks, and registers more accessible
nnoremap gm `

" window management {{{
" You can split the window in Vim by typing :split or :vsplit.
" Navigate the split view easier by pressing CTRL+j, CTRL+k, CTRL+h, or CTRL+l.
nnoremap <c-j> <c-w>j
nnoremap <c-k> <c-w>k
nnoremap <c-h> <c-w>h
nnoremap <c-l> <c-w>l

" Resize split windows using arrow keys by pressing:
" CTRL+UP, CTRL+DOWN, CTRL+LEFT, or CTRL+RIGHT.
noremap <c-up> <c-w>+
noremap <c-down> <c-w>-
noremap <c-right> <c-w>>
noremap <c-left> <c-w><
" end windows }}}

" Auto-capitalize a full word in insert and normal mode
inoremap <c-u> <esc>bvwUi
nnoremap <c-u> bvwU
" Comment a line in and out
nnoremap <leader>c I//<esc>
nnoremap <leader>d ^xx
" Delete all within ()/{}/<>
onoremap p i(
onoremap P i{
onoremap <c-p> i<

" access nerdtree with f3
nnoremap <F3> :NERDTreeToggle<cr>
" emmet activate off CTRL+F instead of CTRL+Y
let g:user_emmet_leader_key='<c-f>'
let NERDTreeIgnore=['tags', '\.git$', '\.jpg$', '\.mp4$', '\.ogg$', '\.iso$', '\.pdf$', '\.pyc$', '\.odt$', '\.png$', '\.gif$', '\.db$']

" grep {{{
" :grep [search term] [files]
nnoremap <leader>gg :silent execute "grep! -R " . shellescape( expand( "<cWORD>" ) ) . " ."<cr>:copen<cr>
" run grep -R, on the NON-EXECUTABLE <cWORD>, in current directory
" vim performs shellescape on <cWORD> literal instead of <cWORD>
" expand( <cWORD> ) forces <cWORD> literal to <cWORD> first
" opens quickfix menu for all matching sequences
nnoremap <leader>gn :cn<cr>
nnoremap <leader>gp :cp<cr>
nnoremap <leader>go :copen<cr>
nnoremap <leader>gc :cclose<cr>
" end grep }}}

" end remapping }}}

" abbreviations {{{

iabbrev nf {{{
iabbrev cf }}}

" end abbreviations }}}

" functions {{{
" + is not used for string concat
" vimscript coerces strings into ints but not strings into floats
" vim defaults "valueless" strings into 0
" the string concat operator is .
" floats as strings will be converted to ints for addition
" floats cannot be concat to strings, but ints can

" creates the initial public static [fname] header in new java files
function Javanew( fname )
	let fname_cut = split( a:fname, '\.' )
	" echo fname_cut
	echo "public class " . fname_cut[0] . " {\n}" >> fname
endfunction

" defines the test displayed by a closed fold
function DefaultFold()
	let line = getline( v:foldstart )
	let sub = substitute( line, '/\*\|\*/\|{{{\d\=', '', 'g' ) "}}}
	return v:folddashes . sub
endfunction

" end functions }}}
