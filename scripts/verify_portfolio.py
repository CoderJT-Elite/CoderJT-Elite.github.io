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
    'about.md': 300,
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
    r'\bsoccer\b',
    r'\bcello\b',
    r'\borchestra\b',
    r'\bathletics\b',
    r'\b1st place\b',
    r'\b2nd place\b',
    r'\b1st prize\b',
    r'\bgrand prize\b',
    r'\bphoto\.jpg\b',
    r'\bheadshot\.jpg\b',
    r'\bavatar\.png\b'
]

APPROVED_PROJECTS = [
    ('ChaseUp', ['chaseupapp.tech', '/work/chaseup/']),
    ('FRC Robot', ['2026-Rebuild', '/work/frc-robot/']),
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
        print('[PASS] Zero forbidden keywords (GPA, test scores, high school, sports, music, awards, headshots) found across all pages.')

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
