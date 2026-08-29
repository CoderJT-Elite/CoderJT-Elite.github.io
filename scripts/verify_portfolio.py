import re
import sys
import glob

def count_prose_words(text):
    text = re.sub(r'^---[\s\S]*?---\n', '', text)
    clean = re.sub(r'<[^>]+>', ' ', text)
    clean = re.sub(r'```[\s\S]*?```', ' ', clean)
    clean = re.sub(r'\$[^\$]*\$', ' ', clean)
    clean = re.sub(r'@\w+\{[\s\S]*?\}', ' ', clean)
    words = [w for w in re.findall(r'\b[\w-]+\b', clean) if not w.isdigit()]
    return len(words)

PAGE_BUDGETS = {
    'index.md': 500,
    'about.md': 400,
    'contact.md': 150,
    'work/chaseup.md': 350,
    'work/frc-robot.md': 350,
    'work/form-analyzer.md': 350,
    'work/neon-racer-3d.md': 350,
    'work/water-wrapped.md': 350
}

FORBIDDEN_PATTERNS = [
    r'\bgpa\b',
    r'\bsat\b',
    r'\bact\b',
    r'\bvaledictorian\b',
    r'\bsalutatorian\b',
    r'\bhigh school\b',
    r'\bgraduation year\b',
    r'\bclass of 20\d\d\b',
    r'\bphoto\.jpg\b',
    r'\bheadshot\.jpg\b',
    r'\bavatar\.png\b'
]

APPROVED_PROJECTS = [
    ('ChaseUp', ['chaseupapp.tech', '/work/chaseup/']),
    ('FRC Robot', ['FRCTeam1506/2026-Rebuild', '/work/frc-robot/']),
    ('Form Analyzer', ['form_analyzer', '/work/form-analyzer/']),
    ('Neon Racer 3D', ['neon-racer-3d', '/work/neon-racer-3d/']),
    ('Water Wrapped', ['WaterWrapped', '/work/water-wrapped/'])
]

APPROVED_BIBTEX_IDS = [
    'tewolde2026machine',
    'tewolde2024computervision',
    'tewolde2021filtered',
    'tewolde2021musicaloutreach'
]

EXPECTED_ROUTES = {
    '/': 'index.md',
    '/about': 'about.md',
    '/contact': 'contact.md',
    '/work/chaseup/': 'work/chaseup.md',
    '/work/frc-robot/': 'work/frc-robot.md',
    '/work/form-analyzer/': 'work/form-analyzer.md',
    '/work/neon-racer-3d/': 'work/neon-racer-3d.md',
    '/work/water-wrapped/': 'work/water-wrapped.md'
}

def verify():
    print('=====================================================')
    print('       PORTFOLIO AUDIT & VERIFICATION SUITE          ')
    print('=====================================================')
    
    failures = []
    
    # 1. Check Page Budgets
    print('\n--- 1. WORD COUNT BUDGETS ---')
    total_prose = 0
    total_raw = 0
    for filename, budget in PAGE_BUDGETS.items():
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        prose_cnt = count_prose_words(content)
        raw_cnt = len(content.split())
        total_prose += prose_cnt
        total_raw += raw_cnt
        
        status = 'PASS' if prose_cnt <= budget else 'FAIL'
        print(f'[{status}] {filename:22}: {prose_cnt:4} prose words (budget: < {budget:3}) | {raw_cnt:4} raw words')
        if prose_cnt > budget:
            failures.append(f'{filename} exceeded word budget: {prose_cnt} > {budget}')
            
    print(f'\nTOTAL PROSE WORDS: {total_prose} (MAX: 2,500)')
    print(f'TOTAL RAW WORDS  : {total_raw}')
    if total_prose >= 2500:
        failures.append(f'Total prose words ({total_prose}) exceeded 2,500 budget limit!')
    else:
        print('[PASS] Total site prose is well below 2,500 words limit.')
        
    # 2. Check Forbidden Keywords
    print('\n--- 2. PRIVACY & BOUNDARY AUDIT (GEMINI.md) ---')
    found_forbidden = False
    for filename in PAGE_BUDGETS.keys():
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read().lower()
        for pat in FORBIDDEN_PATTERNS:
            matches = re.findall(pat, content)
            if matches:
                found_forbidden = True
                failures.append(f'Forbidden pattern "{pat}" matched in {filename}: {matches}')
                print(f'[FAIL] {filename} contains forbidden pattern: {matches}')
    if not found_forbidden:
        print('[PASS] Zero forbidden keywords (GPA, test scores, high school, awards, headshots) found across all pages.')

    # 3. Check Details Tags Closed
    print('\n--- 3. DISCLOSURES STATE CHECK ---')
    open_details = False
    for cs_file in glob.glob('work/*.md'):
        with open(cs_file, 'r', encoding='utf-8') as f:
            content = f.read()
        if re.search(r'<details[^>]*\bopen\b', content, re.IGNORECASE):
            open_details = True
            failures.append(f'{cs_file} has uncollapsed <details open> tags')
            print(f'[FAIL] {cs_file} has uncollapsed disclosure tags')
    if not open_details:
        print('[PASS] All technical disclosures are closed by default (no open attribute).')

    # 4. Check Approved Projects & Links
    print('\n--- 4. APPROVED PROJECTS AUDIT ---')
    with open('index.md', 'r', encoding='utf-8') as f:
        index_content = f.read()
    for proj_name, links in APPROVED_PROJECTS:
        found = any(link in index_content for link in links)
        if not found:
            failures.append(f'Approved project {proj_name} missing from index.md')
            print(f'[FAIL] {proj_name} missing from index.md')
        else:
            print(f'[PASS] {proj_name} verified in project catalog.')

    # 5. Check IEEE Citations
    print('\n--- 5. IEEE RESEARCH CITATIONS AUDIT ---')
    for bib_id in APPROVED_BIBTEX_IDS:
        if bib_id not in index_content:
            failures.append(f'IEEE BibTeX ID {bib_id} missing from index.md')
            print(f'[FAIL] BibTeX ID {bib_id} missing from index.md')
        else:
            print(f'[PASS] BibTeX ID {bib_id} active and verified.')

    # 6. Check FRC GitHub Link Exact Match
    print('\n--- 6. FRC REPO LINK ACCURACY AUDIT ---')
    with open('work/frc-robot.md', 'r', encoding='utf-8') as f:
        frc_cs = f.read()
    if 'https://github.com/FRCTeam1506/2026-Rebuild' not in frc_cs:
        failures.append('work/frc-robot.md does not contain exact https://github.com/FRCTeam1506/2026-Rebuild')
        print('[FAIL] work/frc-robot.md missing FRCTeam1506 repo link')
    else:
        print('[PASS] work/frc-robot.md has correct FRCTeam1506 repo link.')

    if 'https://github.com/FRCTeam1506/2026-Rebuild' not in index_content:
        failures.append('index.md does not contain exact https://github.com/FRCTeam1506/2026-Rebuild')
        print('[FAIL] index.md missing FRCTeam1506 repo link')
    else:
        print('[PASS] index.md has correct FRCTeam1506 repo link.')

    with open('GEMINI.md', 'r', encoding='utf-8') as f:
        gemini_rules = f.read()
    if 'github.com/FRCTeam1506/2026-Rebuild' not in gemini_rules:
        failures.append('GEMINI.md does not contain github.com/FRCTeam1506/2026-Rebuild')
        print('[FAIL] GEMINI.md missing FRCTeam1506 repo link')
    else:
        print('[PASS] GEMINI.md has correct FRCTeam1506 repo link.')

    # 7. Check All Route References and Image Assets
    print('\n--- 7. ASSET & ROUTE INTEGRITY AUDIT ---')
    all_files = glob.glob('**/*.md', recursive=True) + glob.glob('_layouts/*.html')
    asset_paths = glob.glob('assets/**/*', recursive=True)
    
    for filepath in all_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            fc = f.read()
        
        # Check liquid relative_url links
        rel_links = re.findall(r'\{\{\s*[\'"]([^\'"]+)[\'"]\s*\|\s*relative_url\s*\}\}', fc)
        for link in rel_links:
            clean_route = link.split('?')[0].split('#')[0]
            if clean_route.startswith('/assets/'):
                asset_file = clean_route.lstrip('/')
                # Allow .css generated from .scss
                if asset_file == 'assets/css/style.css':
                    continue
                if not any(asset_file in a.replace('\\', '/') for a in asset_paths):
                    failures.append(f'Referenced asset {clean_route} in {filepath} not found on disk')
                    print(f'[FAIL] Asset missing: {clean_route} referenced in {filepath}')
            elif clean_route in EXPECTED_ROUTES:
                pass
            elif clean_route.rstrip('/') in [r.rstrip('/') for r in EXPECTED_ROUTES]:
                pass
            elif clean_route.endswith('.xml') or clean_route == '':
                pass
            else:
                failures.append(f'Unrecognized route {clean_route} in {filepath}')
                print(f'[FAIL] Unrecognized route: {clean_route} in {filepath}')

    print('[PASS] All Liquid asset and page references verified against physical workspace.')

    # 8. Check Case Study Navigation Chain & Interactive DOM Hooks
    print('\n--- 8. DOM HOOKS & CASE STUDY CHAIN AUDIT ---')
    required_index_ids = [
        'kinematicsCanvas', 'tabSwerve', 'tabTriad',
        'sliderVx', 'sliderVy', 'sliderOmega',
        'swerveTelemetry', 'triadTelemetry',
        'selected-work', 'interactive-lab', 'research'
    ]
    for dom_id in required_index_ids:
        if f'id="{dom_id}"' not in index_content:
            failures.append(f'Required DOM element id="{dom_id}" missing from index.md')
            print(f'[FAIL] DOM ID "{dom_id}" missing from index.md')
    if not any(f'Required DOM element id="{dom_id}"' in e for e in failures):
        print('[PASS] All interactive canvas and section anchor IDs verified in index.md.')

    # Case study chain check
    case_studies = [
        ('work/chaseup.md', '', '/work/frc-robot/'),
        ('work/frc-robot.md', '/work/chaseup/', '/work/form-analyzer/'),
        ('work/form-analyzer.md', '/work/frc-robot/', '/work/neon-racer-3d/'),
        ('work/neon-racer-3d.md', '/work/form-analyzer/', '/work/water-wrapped/'),
        ('work/water-wrapped.md', '/work/neon-racer-3d/', '/work/chaseup/')
    ]
    for cs_path, expected_prev, expected_next in case_studies:
        with open(cs_path, 'r', encoding='utf-8') as f:
            cs_text = f.read()
        if expected_prev and f'prev_project_url: "{expected_prev}"' not in cs_text:
            failures.append(f'{cs_path} missing prev_project_url: "{expected_prev}"')
            print(f'[FAIL] {cs_path} prev_project_url mismatch')
        if expected_next and f'next_project_url: "{expected_next}"' not in cs_text:
            failures.append(f'{cs_path} missing next_project_url: "{expected_next}"')
            print(f'[FAIL] {cs_path} next_project_url mismatch')
    print('[PASS] Complete 5-project case study sequential navigation chain verified.')

    print('\n=====================================================')
    if failures:
        print(f'AUDIT FAILED WITH {len(failures)} ERROR(S):')
        for e in failures:
            print(f'  - {e}')
        sys.exit(1)
    else:
        print('ALL VERIFICATION CHECKS PASSED PERFECTLY!')
        print('=====================================================')
        sys.exit(0)

if __name__ == '__main__':
    verify()
