from pathlib import Path
import os

base_dir     = Path(__file__).parents[0]
psepsis_pgm  = base_dir     / 'psepsis.medik'
medik_dir    = base_dir     / 'ext'          / 'medik-semantics'
kompiled_dir = medik_dir    / '.build'       / 'llvm-exec'      / 'medik-llvm-kompiled'
krelease_dir = medik_dir    / 'ext'          / 'k'              / 'k-distribution'      / 'target' / 'release' / 'k'
kbin_dir     = krelease_dir / 'bin'

def set_env():
    path_entires = [ kbin_dir ]
    os.environ['PATH'] = str(kbin_dir.resolve()) \
                                + os.pathsep + os.environ['PATH']

